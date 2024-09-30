import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../../models/message';
import { MessageService } from '../../../core/services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit{
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username: string;
  messageContent: string;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
  }
  
  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageForm.reset();
    });
  }
}
