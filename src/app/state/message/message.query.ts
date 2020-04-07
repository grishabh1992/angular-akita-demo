import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { MessageState, MessageStore } from './message.store';

@Injectable({ providedIn: 'root' })
export class MessageQuery extends QueryEntity<MessageState> {
  constructor(protected store: MessageStore) {
    super(store);
  }
}
