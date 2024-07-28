import { Component, inject } from '@angular/core';
import {
  CdkDropListGroup,
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';

import { KabanboardComponent } from '../kabanboard/kabanboard.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { KanbanBoardModel } from '../../models/kaban';
import { CommonModule } from '@angular/common';
import { TaskManageService } from '../task-manage.service';

@Component({
  selector: 'app-kanban-main',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    KabanboardComponent,
    TaskItemComponent,
  ],
  templateUrl: './kanban-main.component.html',
  styleUrl: './kanban-main.component.scss',
})
export class KanbanMainComponent {
  taskManageService: TaskManageService = inject(TaskManageService);
  kanbanList: KanbanBoardModel[] = [];

  drag(boardId: number) {
    this.taskManageService.idOndrag = boardId
  }

  drop(boardId: number, event: CdkDragDrop<string[]>) {
    this.taskManageService.insertTask(boardId, event.currentIndex, event.previousIndex)
    this.taskManageService.idOndrag = null
  }

  constructor() {
    this.kanbanList = this.taskManageService.getKanbanList();
  }
}
