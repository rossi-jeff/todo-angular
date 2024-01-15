import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewTodoForm } from '../../types/new-todo-form.type';

@Component({
  selector: 'app-new-todo-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-todo-dialog.component.html',
  styleUrl: './new-todo-dialog.component.css',
})
export class NewTodoDialogComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() addTodo = new EventEmitter<NewTodoForm>();
  newTodoForm = new FormGroup({
    Task: new FormControl('', Validators.required),
    Completed: new FormControl(false),
  });

  cancelClicked = () => this.cancel.emit();

  saveClicked = () => {
    if (!this.newTodoForm.valid) return;
    this.addTodo.emit(this.newTodoForm.value);
  };
}
