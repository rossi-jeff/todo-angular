import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/user.type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditUserForm } from '../../types/edit-user-form.type';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css',
})
export class EditUserDialogComponent {
  private _current!: User;
  userForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Email: new FormControl(''),
    Id: new FormControl(''),
  });
  @Input()
  get currentUser() {
    return this._current;
  }
  set currentUser(user: User) {
    this._current = user;
    this.userForm.patchValue({
      UserName: this._current.UserName,
      Email: this._current.Email,
      Id: this._current.Id,
    });
  }
  @Output() cancel = new EventEmitter<void>();
  @Output() update = new EventEmitter<EditUserForm>();

  cancelClicked = () => this.cancel.emit();

  updateClicked = () => {
    if (!this.userForm.valid) return;
    this.update.emit(this.userForm.value);
  };
}
