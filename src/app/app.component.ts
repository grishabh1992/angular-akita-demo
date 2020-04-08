import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from './state/message/message.service';
import { Message } from './state/message/message.model';
import { MessageQuery } from './state/message/message.query';
import { MatCheckboxChange } from '@angular/material';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messageText = '';
  messages$;
  showCompleted = false;
  isAuto = false;
  constructor(
    private messageService: MessageService,
    private messageQuery: MessageQuery) { }
  async ngOnInit(): Promise<void> {
    await this.messageService.initMessages().toPromise();
    this.messages$ = this.messageQuery.selectAll();
  }

  autoRefresh() {
    this.isAuto = !this.isAuto;
    if (!this.isAuto) {
      this.messageService.subscription.unsubscribe();
    }
    this.messageService.autoRefresh();
  }

  completedMessage() {
    this.showCompleted = !this.showCompleted;
    this.messages$ = this.messageQuery.selectAll({
      filterBy: [
        entity => entity.completed === this.showCompleted
      ]
    });
  }

  save() {
    const message: Message = {
      message: this.messageText,
      id: this.messageService.guid(),
      completed: false
    };
    this.messageService.add(message);
    this.messageText = '';
  }

  toggle(evt: MatCheckboxChange, message: Message) {
    this.messageService.update({ ...message, ...{ completed: evt.checked } });
  }

  delete(message: Message) {
    this.messageService.delete(message);
  }
  reset() {
    this.isAuto = false;
    this.showCompleted = false;
    this.messages$ = this.messageQuery.selectAll();
  }


}
