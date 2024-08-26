import { Component, inject } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatInputComponent],
  host: {
    class: 'd-flex'
  },
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  inputValue: string | null = null

  chatService: ChatService = inject(ChatService)

  constructor() {}

  sendMsg() {
    const msg = this.inputValue?.trim() ?? ''
    this.chatService.submit(msg)
  }
}
