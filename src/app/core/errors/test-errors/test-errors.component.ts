import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent implements OnInit{
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get404Error() {
    this.http.get
  }
}
