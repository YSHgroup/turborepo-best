import { Injectable } from '@angular/core';
import { KanbanBoardModel } from '../models/kaban';

@Injectable({
  providedIn: 'root',
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
        },
        {
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

  constructor() {}

  genId(list: any[]): number {
    return (
      list.reduce((acc, item) => {
        return Math.max(acc, item.id);
      }, 0) + 1
    );
  }

  getKanbanList() {
    return this.kanbanList ?? [];
  }
  addTask(boardId: number, name: string, description: string, color: string) {
    this.kanbanList?.forEach((item) => {
      if (item.id === boardId) {
        item.tasks?.push({
          id: this.genId(item.tasks),
          name,
          description,
          color,
        });
      }
    });
  }
  addSubtask(boardId: number, taskId: number, content: string) {
    this.kanbanList?.forEach((item) => {
      if (item.id === boardId) {
        item.tasks?.forEach((task) => {
          if (task.id === taskId) {
            task.subtasks?.push({ id: this.genId(task.subtasks), content });
          }
        });
      }
    });
  }
}
