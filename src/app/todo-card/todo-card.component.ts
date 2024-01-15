import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Todo } from '../../types/todo.type';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoForm } from '../../types/todo-form.type';

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
    Id: new FormControl(''),
  });
  @Output() updateTodo = new EventEmitter<TodoForm>();
  @Output() deleteTodo = new EventEmitter<{ Id?: string | null }>();
  @Input()
  get todo() {
    return this._todo;
  }
  set todo(newTodo: Todo) {
    this._todo = newTodo;
    this.todoForm.patchValue({
      Completed: this._todo.Completed,
      Task: this._todo.Task,
      Id: this._todo.Id,
    });
  }

  editing = signal<boolean>(false);

  edit = () => this.editing.set(true);

  cancelClicked = () => this.editing.set(false);

  completedChanged = () => {
    this.updateTodo.emit(this.todoForm.value);
  };

  updateClicked = () => {
    this.updateTodo.emit(this.todoForm.value);
    this.editing.set(false);
  };

  deleteClicked = () => {
    const { Id } = this.todoForm.value;
    this.deleteTodo.emit({ Id });
  };
}
