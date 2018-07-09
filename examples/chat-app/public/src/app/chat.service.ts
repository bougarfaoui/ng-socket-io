import { Injectable } from '@angular/core';
import { Socket } from '../../../../../index';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
  }

  getMessage() {
    return this.socket
      .fromEvent<any>('msg')
      .pipe(
        map(data => data.msg)
      );
  }

  sendMessage(msg: string) {
    this.socket.emit('msg', msg);
  }
}
