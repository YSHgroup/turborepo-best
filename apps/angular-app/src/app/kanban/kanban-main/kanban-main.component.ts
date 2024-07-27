import { Component, inject } from '@angular/core';
import { KabanboardComponent } from '../kabanboard/kabanboard.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { KanbanBoardModel } from '../../models/kaban';
import { CommonModule } from '@angular/common';
import { TaskManageService } from '../task-manage.service';

@Component({
  selector: 'app-kanban-main',
  standalone: true,
  imports: [CommonModule, KabanboardComponent, TaskItemComponent],
  templateUrl: './kanban-main.component.html',
  styleUrl: './kanban-main.component.scss',
})
export class KanbanMainComponent {  
  taskManageService: TaskManageService = inject(TaskManageService)
  kanbanList: KanbanBoardModel[] = []

  constructor() {
    this.kanbanList = this.taskManageService.getKanbanList()
  }
}
