import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, AsyncPipe, TitleCasePipe, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: res => this.router.navigateByUrl('/members')
    })
  }
  
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
