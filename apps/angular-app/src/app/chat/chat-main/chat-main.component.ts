import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [CommonModule, ChatInputComponent, ChatMessageComponent],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss',
})
export class ChatMainComponent implements OnInit {
  msgList: string[] = []
  chatService: ChatService

  constructor(chatService: ChatService) {
    this.chatService = chatService
  }

  ngOnInit(): void {
    this.chatService.incommingMsg$.subscribe((newMsg) => {
      newMsg && this.msgList.push(newMsg)
      console.log('subscribed: ', newMsg, this.msgList)
    })
  }
  
}
