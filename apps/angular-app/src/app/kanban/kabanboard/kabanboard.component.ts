import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-kabanboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './kabanboard.component.html',
  styleUrl: './kabanboard.component.scss'
})
export class KabanboardComponent {
  faPlus = faPlus
}
