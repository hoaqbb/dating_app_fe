import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { getPaginatedResult, getPaginationHeaders } from '../../shared/helpers/paginationHelpers';
import { Message } from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(this.baseUrl + '/api/Messages', params, this.http);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + '/api/Messages/thread/' + username);
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + '/api/Messages', {recipientUsername: username, content});
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + '/api/Messages/' + id)
  }
}
