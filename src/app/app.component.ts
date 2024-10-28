import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./core/nav/nav.component";
import { User } from './models/user';
import { AccountService } from './core/services/account.service';
import { HomeComponent } from "./features/home/home.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { PresenceService } from './core/services/presence.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'dating_app_fe';

  constructor(private accountService: AccountService, private presenceService: PresenceService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }
  
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user) {
      this.accountService.setCurrentUser(user);
      this.presenceService.createHubConnection(user);
    }
    
  }
}
