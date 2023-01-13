import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


export enum SocketClientState {
  ATTEMPTING, CONNECTED
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  private notifications:any=[];

  private client: Stomp.Client;
  
  private state: BehaviorSubject<SocketClientState>;

  constructor() {

    this.client = Stomp.over(new SockJS(environment.api));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.notifications=[];
  ;}
           
  connect_first(id_user:any)
  {
    this.client.connect({}, () => {
               
      this.state.next(SocketClientState.CONNECTED);
      this.client.subscribe('/topic/note/'+String(id_user), message => {
        var payload = JSON.parse(message.body);
        this.notifications.push(payload);
       console.log(payload);


    });
  })

  }







  getNotification()
{
  return this.notifications;
}

  

   connect(): Observable<Stomp.Client> {
    return new Observable<Stomp.Client>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
              
        observer.next(this.client);
      });
    });
  }
  
}
