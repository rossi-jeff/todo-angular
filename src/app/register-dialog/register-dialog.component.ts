import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterForm } from '../../types/register-form.type';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css',
})
export class RegisterDialogComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() register = new EventEmitter<RegisterForm>();
  registerForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    PassWord: new FormControl('', Validators.required),
    Email: new FormControl(''),
  });

  cancelClicked = () => this.cancel.emit();

  registerClicked = () => {
    if (!this.registerForm.valid) return;
    this.register.emit(this.registerForm.value);
  };
}
