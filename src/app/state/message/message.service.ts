import { Injectable } from '@angular/core';
import { MessageStore } from './message.store';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private messageStore: MessageStore,
    private httpClient: HttpClient) { }

  add(message: Message) {
    this.messageStore.add(message);
  }

  delete(message: Message) {
    this.messageStore.remove(message.id);
  }

  update(message: Message) {
    const messagePayload = JSON.parse(JSON.stringify(message));
    delete messagePayload.id;
    this.messageStore.update(message.id, messagePayload);
  }

  getMessages(): Observable<any> {
    this.messageStore.setLoading(true);
    return this.httpClient.get('assets/messages.json').pipe(
      tap(
        data => {
          console.log(data);
          this.messageStore.set(data);
        },
        error => {
          console.log(error);
          this.messageStore.setLoading(false);
        }
      ));
  }

}
