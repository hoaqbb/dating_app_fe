import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [CommonModule, ModalModule, FormsModule],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  @Input() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[]

  constructor(public bsModalRef: BsModalRef) {}

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}
