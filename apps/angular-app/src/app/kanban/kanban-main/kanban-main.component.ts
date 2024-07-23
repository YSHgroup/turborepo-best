import { Component } from '@angular/core';
import { KabanboardComponent } from '../kabanboard/kabanboard.component';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-kanban-main',
  standalone: true,
  imports: [KabanboardComponent, TaskItemComponent],
  templateUrl: './kanban-main.component.html',
  styleUrl: './kanban-main.component.scss'
})
export class KanbanMainComponent {

}
