import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  trigger,
  state,
  style,
  transition,
} from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { TaskModel } from '../../models/kaban';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  animations: [
    trigger('toggleTask', [
      state('open', style({
        height: 'fit-content'
      })),
      state('closed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      transition('open => closed, closed => open', [animate('0.2s ease-in')]),
    ]),
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input({ required: true }) task?: TaskModel;
  faCaretUp = faCaretUp;
  isOpen = true;

  constructor() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
