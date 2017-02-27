# ng2-socket-io
[![Build Status](https://travis-ci.org/bougarfaoui/ng2-socket-io.svg?branch=master)](https://travis-ci.org/bougarfaoui/ng2-socket-io)
[![npm version](https://badge.fury.io/js/ng2-socket-io.svg)](https://badge.fury.io/js/ng2-socket-io)

[Socket.IO](http://socket.io/) module for Angular 2

## Install
``` npm install ng2-socket-io ```

## How to use

### Import and configure SocketIoModule

```ts
//...
import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We need to configure ```SocketIoModule``` module using the object ```config``` of type ```SocketIoConfig```, this object accepts two optional properties they are the same used here [io(url[, options])](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#iourl-options).

Now we pass the configuration to the static method ```forRoot``` of ```SocketIoModule```

### Using your socket Instance

The ```SocketIoModule``` provides now a configured ```Socket``` service that can be inject anywhere inside the ```AppModule```.

```typescript
import { Injectable } from '@angular/core';
import { Socket } from 'ng2-socket-io';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) { }

    sendMessage(msg: string){
        this.socket.emit("message", msg);
    }
    
    getMessage() {
        return this.socket
            .fromEvent("message")
            .subscribe((message) => {
                 // todo
            });
    }
}
```

### Using multiple sockets with different end points

In this case we don't need to configure The ```SocketIoModule```, what we have to do is to extend the ```Socket``` service and specify the ```url``` and the ```options``` object.

```typescript
import { Injectable, NgModule } from '@angular/core';
import { Socket } from 'ng2-socket-io';

@Injectable()
export class SocketOne extends Socket {

    constructor() {
        super({ url: 'http://url_one', options: {} });
    }

}

@Injectable()
export class SocketTwo extends Socket {

    constructor() {
        super({ url: 'http://url_two', options: {} });
    }

}

@NgModule({
  declarations: [
    //components
  ],
  imports: [
    SocketIoModule,
    //...
  ],
  providers: [SocketOne, SocketTwo],
  bootstrap: [/** AppComponent **/]
})
export class AppModule { }
 
```

Now you can inject ```SocketOne```, ```SocketTwo``` in other services and components.

As you see there is no need to configure the ```SocketIoModule``` using ```forRoot``` method.


## API

Most of the functionalities here you are already familiar with.

the only addition is the ```onEvent``` method, which returns an ```Observable``` that you can subscribe to.

### `socket.on(eventName: string)`
Takes an event name and callback.
Works the same as in Socket.IO.

### `socket.removeListener(eventName: string, callback: Function)`
Takes an event name and callback.
Works the same as in Socket.IO.

### `socket.removeAllListeners(eventName: string)`
Takes an event name.
Works the same as in Socket.IO.

### `socket.emit(eventName:string, message: any, [callback: Function])`
Sends a message to the server.
Optionally takes a callback.
Works the same as in Socket.IO.

### `socket.fromEvent(eventName: string): Observable<any>`
Takes an event name and return an observable that you can subscribe to.
if you unsubscribe to this observable the listener will removed using  ```socket.removeListener```.

##### Example

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig, Socket} from 'ng2-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@Injectable()
class ChatService {

    constructor(private socket: Socket) { }

    sendMessage(msg: string){
        this.socket.emit("message", msg);
    }

    getMessage() {
        return this.socket
            .fromEvent("message")
            .subscribe((message) => {
                // todo
            });
    }
    
    close() {
      this.socket.disconnect()
    }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config) 
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## LICENSE

MIT
