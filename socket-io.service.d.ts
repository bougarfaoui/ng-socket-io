import { Observable } from 'rxjs/Observable';
import { SocketIoConfig } from './socketIoConfig';
export declare class WrappedSocket {
    ioSocket: any;
    constructor(config: SocketIoConfig);
    on(eventName: string, callback: Function): void;
    once(eventName: string, callback: Function): void;
    connect(): any;
    disconnect(close: any): any;
    emit(eventName: string, data: any, callback?: Function): any;
    removeListener(eventName: string, callback?: Function): any;
    removeAllListeners(eventName: string): any;
    /** create an Observable from an event */
    fromEvent(eventName: string): Observable<any>;
}
