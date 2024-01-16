import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-user-buttons',
  standalone: true,
  imports: [],
  templateUrl: './user-buttons.component.html',
  styleUrl: './user-buttons.component.css',
})
export class UserButtonsComponent {
  @Input() currentUser!: User;
  @Output() showEditUser = new EventEmitter<void>();
  @Output() showChangePW = new EventEmitter<void>();

  editClicked = () => this.showEditUser.emit();

  changeClicked = () => this.showChangePW.emit();
}
