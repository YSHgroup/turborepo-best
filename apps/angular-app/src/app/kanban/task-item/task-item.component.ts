import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  trigger,
  state,
  style,
  transition,
} from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { TaskModel } from '../../models/kaban';
import { FormsModule } from '@angular/forms';
import { TaskManageService } from '../task-manage.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  animations: [
    trigger('toggleTask', [
      state('open', style({
        height: '*',
        overflow: 'hidden'
      })),
      state('closed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('open => closed, closed => open', [animate('0.2s  ease-in')]),
    ]),
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input({ required: true }) task?: TaskModel;
  @Input({required: true}) boardId: string | null = null
  taskManageService: TaskManageService = inject(TaskManageService);

  subtask: string | null = null
  faCaret = faCaretUp;
  isOpen = false;

  constructor() {}

  toggle() {
    this.isOpen = !this.isOpen;
    this.faCaret = this.isOpen? faCaretUp: faCaretDown
  }

  inputSubTask() {
    if(!this.subtask?.length) return
    this.taskManageService.addSubtask(this.task!._id, this.subtask as string)
    this.subtask = ''
  }
}
