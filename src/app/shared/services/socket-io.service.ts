import { Injectable } from '@angular/core';
import { io } from "socket.io-client";

import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SocketIoService {

  
  private clientSocket;
  constructor() { 
    this.clientSocket = io(`${env.BASE_END_POINT}`, {
      transports: ['websocket', 'polling', 'flashsocket']
    });
  }

  listenIoServer(connection: string): Observable<any>{
    return new Observable((subscribe) => {
      this.clientSocket.on(connection, (data) => {
        subscribe.next(data);
      })
    })
  }

  emitToServer(connection: any, data: any): void{
    this.clientSocket.emit(connection, data);
  }
}
