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
var Observable_1 = require("rxjs/Observable");
var io = require("socket.io-client");
var WrappedSocket = (function () {
    function WrappedSocket(config) {
        var url = config.url || '';
        var options = config.options || {};
        this.ioSocket = io(url, options);
    }
    WrappedSocket.prototype.on = function (eventName, callback) {
        this.ioSocket.on(eventName, callback);
    };
    WrappedSocket.prototype.once = function (eventName, callback) {
        this.ioSocket.once(eventName, callback);
    };
    WrappedSocket.prototype.connect = function () {
        return this.ioSocket.connect();
    };
    WrappedSocket.prototype.disconnect = function (close) {
        return this.ioSocket.disconnect.apply(this.ioSocket, arguments);
    };
    WrappedSocket.prototype.emit = function (eventName, data, callback) {
        return this.ioSocket.emit.apply(this.ioSocket, arguments);
    };
    WrappedSocket.prototype.removeListener = function (eventName, callback) {
        return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
    };
    WrappedSocket.prototype.removeAllListeners = function (eventName) {
        return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
    };
    /** create an Observable from an event */
    WrappedSocket.prototype.fromEvent = function (eventName) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.ioSocket.on(eventName, function (data) {
                observer.next(data);
            });
            return function () {
                _this.ioSocket.removeListener(eventName);
            };
        });
    };
    return WrappedSocket;
}());
WrappedSocket = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], WrappedSocket);
exports.WrappedSocket = WrappedSocket;
//# sourceMappingURL=socket-io.service.js.map