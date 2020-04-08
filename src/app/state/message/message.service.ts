import { Injectable } from '@angular/core';
import { MessageStore } from './message.store';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';
import { tap, flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  subscription: Subscription;
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

  initMessages(): Observable<any> {
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

  autoRefresh() {
    this.subscription = interval(5 * 1000)
      .pipe(
        map((data) => {
          this.messageStore.add({
            id: this.guid(),
            message: `Random Message ${this.guid()}`,
            completed: false
          });
          return data;
        })
      ).subscribe();
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4();
  }

}
