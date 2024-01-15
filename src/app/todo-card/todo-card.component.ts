import { Component, Input, signal } from '@angular/core';
import { Todo } from '../../types/todo.type';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css',
})
export class TodoCardComponent {
  private _todo!: Todo;
  todoForm = new FormGroup({
    Completed: new FormControl(false),
    Task: new FormControl(''),
  });
  @Input()
  get todo() {
    return this._todo;
  }
  set todo(newTodo: Todo) {
    this._todo = newTodo;
    this.todoForm.patchValue({
      Completed: this._todo.Completed,
      Task: this._todo.Task,
    });
  }
  editing = signal<boolean>(false);

  edit = () => this.editing.set(true);

  cancel = () => this.editing.set(false);
}
