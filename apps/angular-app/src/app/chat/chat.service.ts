import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly socket = io('ws://localhost:5000')
  private incommingMsgSubject = new BehaviorSubject<string | null>(null)
  incommingMsg$ = this.incommingMsgSubject.asObservable()

  constructor() {
    this.socket.on('chat message', (msg: string, id) => {
      console.log('incomming: ',msg, id)
      this.updateMsg(msg)
    })
   }

  updateMsg(msg: string | null) {
    this.incommingMsgSubject.next(msg)
  }

  submit(msg: string) {
    console.log('message: ', msg)
    this.socket.emit('chat message', msg)
  }
}
