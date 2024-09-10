import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  baseUrl = environment.apiUrl;
  registerMode = false;

  constructor() { }

  ngOnInit(): void {

  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
