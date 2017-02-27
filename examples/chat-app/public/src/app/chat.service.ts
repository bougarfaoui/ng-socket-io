import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'; 
import { Socket } from 'ng2-socket-io';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) {}

    getMessage() {
        return this.socket
            .fromEvent("msg")
            .map(data => data.msg);
    }

    sendMessage(msg: string) {
        this.socket
            .emit("msg", msg);
    }
}