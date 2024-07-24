import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { KabanBoardModel } from '../../models/kaban';

@Component({
  selector: 'app-kabanboard',
  standalone: true,
  imports: [FontAwesomeModule],
  host: {
    'class': 'card m-2 kanban-board shadow-sm'
  },
  templateUrl: './kabanboard.component.html',
  styleUrl: './kabanboard.component.scss'
})
export class KabanboardComponent {
  @Input({required: true}) taskBoard?: KabanBoardModel
  faPlus = faPlus
}
