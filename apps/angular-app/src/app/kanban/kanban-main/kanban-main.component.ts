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
  styleUrl: './kanban-main.component.scss',
})
export class KanbanMainComponent {
  kanbanList?: KabanBoardModel[] = [
    {
      id: 1,
      name: 'To do',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'This is task description 1',
          color: 'red',
          subtasks: [
            { id: 1, content: 'Create task' },
            { id: 2, content: 'Update task' },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Progress',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'This is task description 1',
          color: 'red',
          subtasks: [
            { id: 1, content: 'Create task' },
            { id: 2, content: 'Update task' },
          ],
        },{
          id: 1,
          name: 'Task 2',
          description: 'This is task description 2',
          color: 'greenyellow',
          subtasks: [
            { id: 1, content: 'Create task' },
            { id: 2, content: 'Update task' },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Done',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'This is task description 1',
          color: 'red',
          subtasks: [
            { id: 1, content: 'Create task' },
            { id: 2, content: 'Update task' },
          ],
        },
      ],
    },
  ];

  constructor() {
  }
}
