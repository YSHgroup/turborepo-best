import { Injectable } from '@angular/core';
import { KanbanBoardModel, TaskModel } from '../models/kaban';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManageService {
  private baseUrl = 'api/kanban';
  private baseHeaders = new HttpHeaders({ 'Sec-Fetch-Mode': 'no-cors' });
  private kanbanSubject = new BehaviorSubject<KanbanBoardModel[]>([]);
  kanbanList$ = this.kanbanSubject.asObservable();
  idOndrag: string | null = null;
  taskIdOndrag: string | null = null;

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
    return this.http.get<KanbanBoardModel[]>(`${this.baseUrl}/board`, {
      headers: this.baseHeaders,
    });
  }

  addTask(boardId: string, name: string, description: string, color: string) {
    console.log('id: ', boardId);

    const payload = {
      boardId,
      task: {
        name,
        description,
        color,
      },
    };

    this.http
      .post(`${this.baseUrl}/task/create`, payload)
      .pipe(catchError(this.errorHandler<KanbanBoardModel>()))
      .subscribe({
        next: (res) => {
          console.log('data: ', res);
          this.updateKanban();
        },
        error: (error) => {
          console.error('Error adding task:', error);
          // Additional error handling if needed
        },
      });
    // this.kanbanList?.forEach((item) => {
    //   if (item._id === boardId) {
    //     item.tasks?.push({
    //       _id: this.genId(item.tasks),
    //       name,
    //       description,
    //       color,
    //       subtasks: [],
    //     });
    //   }
    // });
  }

  updateKanban() {
    this.getKanbanList().subscribe((data) => this.kanbanSubject.next(data));
  }

  addSubtask(taskId: string, content: string) {
    this.http
      .post(`${this.baseUrl}/task/${taskId}/subtasks`, { subtask: {content} })
      .subscribe((res) => {
        console.log('subtask added:', res);
        this.updateKanban();
      });
    // this.kanbanList?.forEach((item) => {
    //   if (item._id === boardId) {
    //     item.tasks?.forEach((task) => {
    //       if (task._id === taskId) {
    //         task.subtasks?.push({ _id: this.genId(task.subtasks), content });
    //       }
    //     });
    //   }
    // });
  }
  insertTask(boardId: string, currentIndex: number, previousIndex: number) {
    console.log('currentIndex: ', this.idOndrag, 'previousIndex: ', previousIndex)
    if (boardId === this.idOndrag) return 

    const boardIds = {
      currentId: this.idOndrag,
      targetId: boardId
    }
    this.http.patch(`${this.baseUrl}/task/${this.taskIdOndrag}`, {boardIds}).subscribe(() => {
      this.updateKanban()
    })
    // let source: TaskModel;
    // this.kanbanList?.forEach((sourceItem) => {
    //   if (sourceItem._id === this.idOndrag) {
    //     source = {
    //       ...sourceItem.tasks!.splice(previousIndex, 1)[0],
    //       _id: this.genId(sourceItem.tasks!),
    //     };
    //   }
    // });

    // this.kanbanList?.forEach((item) => {
    //   if (item._id === boardId) {
    //     item.tasks?.splice(currentIndex, 0, source);
    //   }
    // });
  }

  private errorHandler<T>(result?: T) {
    return <O>(error: any, caught: Observable<O>) => {
      console.log('Error: ', error, 'Caught: ', caught);
      return of(result);
    };
  }
}
