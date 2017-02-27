import { NgModule, ModuleWithProviders } from '@angular/core';

import { WrappedSocket } from './socket-io.service';
import { SocketIoConfig } from './socketIoConfig';


/** Socket factory */
export function SocketFactory(config: SocketIoConfig) {
    return new WrappedSocket(config);
}

export const socketConfig: string = "__SOCKET_IO_CONFIG__";

@NgModule({})
export class SocketIoModule {
    static forRoot(config: SocketIoConfig): ModuleWithProviders {
        return {
            ngModule: SocketIoModule,
            providers: [
                { provide: socketConfig, useValue: config },
                { 
                    provide: WrappedSocket,
                    useFactory: SocketFactory,
                    deps : [socketConfig]
                }
            ]
        };
    }
 }