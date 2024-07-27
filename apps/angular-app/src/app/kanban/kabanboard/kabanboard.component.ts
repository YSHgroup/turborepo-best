import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { KanbanBoardModel } from '../../models/kaban';
import { NewTaskComponent } from '../modal/new-task/new-task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kabanboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SweetAlert2Module, NewTaskComponent],
  host: {
    class: 'card m-2 kanban-board shadow-sm',
  },
  templateUrl: './kabanboard.component.html',
  styleUrl: './kabanboard.component.scss',
})
export class KabanboardComponent {
  @Input({ required: true }) taskBoard?: KanbanBoardModel;
  faPlus = faPlus;
  isTaskModalOpen = false

  newTask() {
    this.isTaskModalOpen = true
  }

  closeTaskModal() {
    this.isTaskModalOpen = false
  }

  fireSwal() {
    Swal.fire({
      title: 'New task',
      input: 'text',
      inputLabel: 'Task title',
      confirmButtonText: 'Confirm',
      iconColor: 'yellowgreen',
    }).then((result) => console.log('value: ', result));
  }
}
