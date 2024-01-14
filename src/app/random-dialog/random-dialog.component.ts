import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RandomForm } from '../../types/random-form.type';

@Component({
  selector: 'app-random-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './random-dialog.component.html',
  styleUrl: './random-dialog.component.css',
})
export class RandomDialogComponent {
  @Input() userNames!: string[];
  @Output() cancel = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<RandomForm>();
  randomForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
  });

  cancelClicked = () => this.cancel.emit();

  signInClicked = () => {
    if (!this.randomForm.valid) return;
    this.signIn.emit(this.randomForm.value);
  };
}
