import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ChatInputComponent],
  host: {
    class: 'd-flex'
  },
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {

}
