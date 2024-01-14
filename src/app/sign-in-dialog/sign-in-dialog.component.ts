import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignInForm } from '../../types/sign-in-form.type';

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.css',
})
export class SignInDialogComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<SignInForm>();
  signInForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    PassWord: new FormControl('', Validators.required),
  });

  cancelClicked = () => this.cancel.emit();

  signInClicked = () => {
    if (!this.signInForm.valid) return;
    this.signIn.emit(this.signInForm.value);
  };
}
