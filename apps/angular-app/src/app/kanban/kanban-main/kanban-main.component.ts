import { Component } from '@angular/core';
import { KabanboardComponent } from '../kabanboard/kabanboard.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { KabanBoardModel } from '../../models/kaban';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-main',
  standalone: true,
  imports: [CommonModule, KabanboardComponent, TaskItemComponent],
  templateUrl: './kanban-main.component.html',
  styleUrl: './kanban-main.component.scss'
})
export class KanbanMainComponent {
  kanbanList?: KabanBoardModel[]

  constructor() {
    this.kanbanList = [
      {
        id: 1,
        name: 'To do',
      },{
        id: 2,
        name: 'Progress',
      },{
        id: 3,
        name: 'Done',
      },
  ]
  }
}
