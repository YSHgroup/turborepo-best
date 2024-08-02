import { Injectable } from '@angular/core';
import { KanbanBoardModel, TaskModel } from '../models/kaban';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManageService {
  baseUrl = 'http://localhost:5000/kanban'
  kanbanList?: KanbanBoardModel[] = [];
  idOndrag: number | null = null;

  constructor(private http: HttpClient) {}

  genId(list: any[]): number {
    return (
      list.reduce((acc, item) => {
        return Math.max(acc, item.id);
      }, 0) + 1
    );
  }

  getKanbanList(): Observable<KanbanBoardModel[]> {
    // return this.kanbanList ?? [];
    return this.http.get<KanbanBoardModel[]>(`${this.baseUrl}/board`)
  }
  addTask(boardId: number, name: string, description: string, color: string) {
    this.kanbanList?.forEach((item) => {
      if (item.id === boardId) {
        item.tasks?.push({
          id: this.genId(item.tasks),
          name,
          description,
          color,
          subtasks: [],
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
  insertTask(boardId: number, currentIndex: number, previousIndex: number) {
    let source: TaskModel;

    this.kanbanList?.forEach((sourceItem) => {
      if (sourceItem.id === this.idOndrag) {
        source = {
          ...sourceItem.tasks!.splice(previousIndex, 1)[0],
          id: this.genId(sourceItem.tasks!),
        };
      }
    });

    this.kanbanList?.forEach((item) => {
      if (item.id === boardId) {
        item.tasks?.splice(currentIndex, 0, source);
      }
    });
  }
}
