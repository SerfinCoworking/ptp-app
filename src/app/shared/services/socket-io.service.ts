import { Injectable } from '@angular/core';
import { io } from "socket.io-client";

import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';

@Injectable()
export class SocketIoService {

  
  private clientSocket;
  constructor(private authService: AuthService) { 
    this.authService.currentUserLoggedIn.subscribe((user) => {
      this.clientSocket = io(`${env.BASE_END_POINT}`, {
        transports: ['websocket', 'polling', 'flashsocket'],
        query: {
          name: 'username' in user ? user.username : user.identifier
        }
      });
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
