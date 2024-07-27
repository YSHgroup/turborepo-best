import { Injectable } from '@angular/core';
import { KanbanBoardModel } from '../models/kaban';

@Injectable({
  providedIn: 'root'
})
export class TaskManageService {
  kanbanList?: KanbanBoardModel[] = [
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
          id: 2,
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

  getKanbanList() {
    return this.kanbanList ?? [];
  }

  addTask(boardId: number, name: string, description: string, color: string) {
    this.kanbanList?.forEach(item => {
      if(item.id === boardId) {
        item.tasks?.push({
          id: Math.random(),
          name,
          description,
          color
        })
      }
    })
  }

  constructor() { }
}
