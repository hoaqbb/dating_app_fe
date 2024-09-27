import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../../models/member';
import { User } from '../../../models/user';
import { AccountService } from '../../../core/services/account.service';
import { MembersService } from '../../../core/services/members.service';
import { take } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [FormsModule, TabsModule, PhotoEditorComponent, TimeagoModule, DatePipe],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService, 
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }


  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => 
      this.member = member
    );
  }

  updateMember() { 
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully!');
      this.editForm.reset(this.member);
    });
    
  }
}
