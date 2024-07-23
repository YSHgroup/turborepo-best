import { Component } from '@angular/core';
import { KabanboardComponent } from '../kabanboard/kabanboard.component';

@Component({
  selector: 'app-kanban-main',
  standalone: true,
  imports: [KabanboardComponent],
  templateUrl: './kanban-main.component.html',
  styleUrl: './kanban-main.component.scss'
})
export class KanbanMainComponent {

}
