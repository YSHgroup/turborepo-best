import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly socket = io('ws://localhost:5000', {
    auth: {
      severOffset: 0
    },
    ackTimeout: 5000,
    retries: 3
  })
  private incommingMsgSubject = new BehaviorSubject<string | null>(null)
  incommingMsg$ = this.incommingMsgSubject.asObservable()
  counter = 0

  constructor() {
    this.socket.on('chat message', (msg: string, serverOffset) => {
      console.log('incomming: ',msg, serverOffset)
      this.updateMsg(msg);
      (this.socket.auth as Record<string, any>)['serverOffset'] = serverOffset
    })
   }

  updateMsg(msg: string | null) {
    this.incommingMsgSubject.next(msg)
  }

  submit(msg: string) {
    if(!msg) return
    console.log('message: ', msg)
    const clientOffset = `${this.socket.id}-${this.counter ++}`
    this.socket.emit('chat message', msg, clientOffset)
  }
}
