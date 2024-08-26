import { Component } from '@angular/core';
import { ChatInputComponent } from "../chat-input/chat-input.component";

@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [ChatInputComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss'
})
export class ChatMainComponent {

}
