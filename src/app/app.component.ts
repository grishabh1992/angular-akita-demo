import { Component, OnInit } from '@angular/core';
import { MessageService } from './state/message/message.service';
import { Message } from './state/message/message.model';
import { MessageQuery } from './state/message/message.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messageText = '';
  messages = [];
  messages$;
  constructor(private messageService: MessageService,
    private messageQuery: MessageQuery) { }
  async ngOnInit(): Promise<void> {
    this.messageService.getMessages().subscribe((data) => {
      this.messages = data;
    });

    this.messages$ = this.messageQuery.selectAll();
  }

  save() {
    const message: Message = {
      message: this.messageText,
      id: this.guid(),
      completed: false
    };
    this.messageService.add(message);
    this.messageText = '';
  }

  toggle(e) {

  }

  delete(message: Message) {

  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4();
  }
}
