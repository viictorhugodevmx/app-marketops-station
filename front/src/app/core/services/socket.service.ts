import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private ws!: WebSocket;

  connect(): Observable<any> {
    return new Observable(observer => {

      this.ws = new WebSocket('ws://localhost:3000');

      this.ws.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      this.ws.onerror = (error) => {
        observer.error(error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
      };
    });
  }
}
