import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly socket = io('ws://localhost:5000')

  constructor() { }

  submit(msg: string) {
    console.log('message: ', msg)
    // this.socket.emit('chat message', msg)
  }
}
