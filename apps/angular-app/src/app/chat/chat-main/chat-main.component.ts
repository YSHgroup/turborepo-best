import { Component, OnInit } from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [ChatInputComponent, ChatMessageComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss',
})
export class ChatMainComponent implements OnInit {
  msg: string | null = null
  chatService: ChatService

  constructor(chatService: ChatService) {
    this.chatService = chatService
  }

  ngOnInit(): void {
    this.chatService.incommingMsg$.subscribe((newMsg) => {
      this.msg = newMsg
      console.log('subscribed: ', newMsg)
    })
  }
  
}
