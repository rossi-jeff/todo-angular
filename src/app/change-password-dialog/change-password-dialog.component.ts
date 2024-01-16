import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PassWordForm } from '../../types/pass-word-form.type';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  passWordForm = new FormGroup({
    OldPassWord: new FormControl('', Validators.required),
    NewPassWord: new FormControl('', Validators.required),
    Confirmation: new FormControl('', Validators.required),
  });
  @Output() cancel = new EventEmitter<void>();
  @Output() changePW = new EventEmitter<PassWordForm>();

  cancelClicked = () => this.cancel.emit();

  changeClicked = () => {
    if (!this.passWordForm.valid) return;
    this.changePW.emit(this.passWordForm.value);
  };
}
