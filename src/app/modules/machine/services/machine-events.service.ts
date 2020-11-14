import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeedEvent } from '../interfaces/feed-event.interface';
import { Socket } from 'phoenix';
import { share } from 'rxjs/operators';

const SOCKET_URL = 'ws://machinestream.herokuapp.com/api/v1/events';

const socketSource$ = new Observable<FeedEvent>(observer => {
  const socket = new Socket(SOCKET_URL);
  // @Todo: debugging
  console.log('socket.connect');
  socket.connect();

  const channelRef = socket.channel('events', {});
  channelRef.join();
  channelRef.on('new', event => observer.next(event));

  return () => {
    // @Todo: debugging
    console.log('socket.disconnect');
    socket.disconnect();
  };
});

@Injectable({
  providedIn: 'root'
})
export class MachineEventsService {

  events$: BehaviorSubject<FeedEvent> = new BehaviorSubject<FeedEvent>(null);

  constructor() {}

  getEvents(): Observable<FeedEvent> {
    return socketSource$.pipe(share());
  }
}
