import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../core/services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { Observable, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Pagination } from '../../../models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserParams } from '../../../models/userParams';
import { AccountService } from '../../../core/services/account.service';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, AsyncPipe, PaginationModule, FormsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderLists = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  
  constructor(private memberService: MembersService, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }
}
