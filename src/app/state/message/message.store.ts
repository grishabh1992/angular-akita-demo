import { StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Message } from './message.model';

export interface MessageState extends EntityState<Message> { }

export function createInitialState(): MessageState {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'message', idKey: 'id' })
export class MessageStore extends EntityStore<MessageState> {
  constructor() {
    super(createInitialState());
  }
}
