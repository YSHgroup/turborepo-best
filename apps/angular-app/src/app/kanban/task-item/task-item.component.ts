import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons'
import { TaskModel } from '../../models/kaban';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input({required: true}) task?: TaskModel
  faCaretUp = faCaretUp

  constructor() {
  }

}
