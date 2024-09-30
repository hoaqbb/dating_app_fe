import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { Message } from '../../models/message';
import { Pagination } from '../../models/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ButtonsModule, FormsModule, RouterLink, TimeagoModule, PaginationModule, TitleCasePipe, JsonPipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe( response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1)
    })
  }

  pageChanged(event: any) {
    if(this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
