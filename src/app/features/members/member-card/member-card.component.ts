import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit{
  @Input() member: Member;

  constructor() { }

  ngOnInit(): void {
    
  }
}
