"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var socket_io_service_1 = require("./socket-io.service");
/** Socket factory */
function SocketFactory(socketConfig) {
    return new socket_io_service_1.WrappedSocket(socketConfig);
}
var SocketIoModule = SocketIoModule_1 = (function () {
    function SocketIoModule() {
    }
    SocketIoModule.forRoot = function (config) {
        return {
            ngModule: SocketIoModule_1,
            providers: [
                { provide: socket_io_service_1.WrappedSocket, useValue: SocketFactory(config) }
            ]
        };
    };
    return SocketIoModule;
}());
SocketIoModule = SocketIoModule_1 = __decorate([
    core_1.NgModule({}),
    __metadata("design:paramtypes", [])
], SocketIoModule);
exports.SocketIoModule = SocketIoModule;
var SocketIoModule_1;
//# sourceMappingURL=socket-io.module.js.map