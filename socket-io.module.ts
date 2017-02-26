import { NgModule, ModuleWithProviders } from '@angular/core';

import { WrappedSocket } from './socket-io.service';
import { SocketIoConfig } from './socketIoConfig';


/** Socket factory */
function SocketFactory(socketConfig: SocketIoConfig) {
    return new WrappedSocket(socketConfig);
}

@NgModule({})
export class SocketIoModule {
    static forRoot(config: SocketIoConfig): ModuleWithProviders {
        return {
            ngModule: SocketIoModule,
            providers: [
                { provide: WrappedSocket, useValue: SocketFactory(config) }
            ]
        };
    }
 }
