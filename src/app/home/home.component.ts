import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../../types/user.type';
import { SessionStorage } from '../../lib/session-storage';
import { Todo } from '../../types/todo.type';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { RegisterForm } from '../../types/register-form.type';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';
import { SignInForm } from '../../types/sign-in-form.type';
import { RandomDialogComponent } from '../random-dialog/random-dialog.component';
import { RandomForm } from '../../types/random-form.type';
import { ResponseLogin } from '../../types/response-login.type';
import { randomUser } from '../../lib/random-user';
import { SessionData, blankSession } from '../../types/session-data.type';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoForm } from '../../types/todo-form.type';
import { NewTodoDialogComponent } from '../new-todo-dialog/new-todo-dialog.component';
import { NewTodoForm } from '../../types/new-todo-form.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopBarComponent,
    BottomBarComponent,
    RegisterDialogComponent,
    SignInDialogComponent,
    RandomDialogComponent,
    TodoCardComponent,
    NewTodoDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  users: User[] = [];
  userNames: string[] = [];
  currentUser: User | null = null;
  session: SessionData = blankSession;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private api: ApiService
  ) {}

  showOverlay = () => {
    if (isPlatformBrowser(this.platformId)) {
      const overlay = document.getElementById('modal-overlay');
      if (overlay) overlay.classList.add('open');
    }
  };

  hideOverlay = () => {
    if (isPlatformBrowser(this.platformId)) {
      const overlay = document.getElementById('modal-overlay');
      if (overlay) overlay.classList.remove('open');
    }
  };

  showDialog = (id: string) => {
    if (isPlatformBrowser(this.platformId)) {
      const dialog = document.getElementById(id);
      if (dialog) dialog.classList.add('open');
      this.showOverlay();
    }
  };

  hideDialog = (id: string) => {
    if (isPlatformBrowser(this.platformId)) {
      const dialog = document.getElementById(id);
      if (dialog) dialog.classList.remove('open');
      this.hideOverlay();
    }
  };

  showRegister = () => {
    this.showDialog('register-dialog');
  };

  hideRegister = () => {
    this.hideDialog('register-dialog');
  };

  register = (event: RegisterForm) => {
    const { UserName, PassWord, Email } = event;
    if (!UserName || !PassWord) return;
    this.api
      .post({
        path: 'auth/register',
        body: { UserName, PassWord, Email },
      })
      .subscribe(() => {
        this.hideRegister();
      });
  };

  showSignIn = () => {
    this.showDialog('sign-in-dialog');
  };

  hideSignIn = () => {
    this.hideDialog('sign-in-dialog');
  };

  signIn = (event: SignInForm) => {
    const { UserName, PassWord } = event;
    if (!UserName || !PassWord) return;
    this.api
      .post({ path: 'auth/login', body: { UserName, PassWord } })
      .subscribe((result: any) => {
        const data: ResponseLogin = result;
        const { Token } = data;
        if (isPlatformBrowser(this.platformId)) {
          const s = new SessionStorage();
          s.data = { UserName, Token, SignedIn: true };
          this.session = s.data;
        }
        this.loadCurrentUser();
        this.loadTodos();
        this.hideSignIn();
      });
  };

  showRandom = () => {
    this.showDialog('random-dialog');
  };

  hideRandom = () => {
    this.hideDialog('random-dialog');
  };

  randomSignIn = (event: RandomForm) => {
    const { UserName } = event;
    if (!UserName) return;
    this.api
      .post({ path: 'auth/login', body: { UserName, PassWord: randomUser } })
      .subscribe((result: any) => {
        const data: ResponseLogin = result;
        const { Token } = data;
        if (isPlatformBrowser(this.platformId)) {
          const s = new SessionStorage();
          s.data = { UserName, Token, SignedIn: true };
          this.session = s.data;
        }
        this.loadCurrentUser();
        this.loadTodos();
        this.hideRandom();
      });
  };

  signOut = () => {
    if (isPlatformBrowser(this.platformId)) {
      const s = new SessionStorage();
      s.data = blankSession;
      this.session = s.data;
      this.currentUser = null;
      this.todos = [];
    }
  };

  updateTodo = (event: TodoForm) => {
    const { Id, Task, Completed } = event;
    if (!Id || !Task || Completed == undefined || Completed == null) return;
    this.api
      .patch({
        path: `todo/${Id}`,
        body: { Task, Completed },
        token: this.session.Token || '',
      })
      .subscribe(() => this.loadTodos());
  };

  deleteTodo = (event: { Id?: string | null }) => {
    const { Id } = event;
    if (!Id) return;
    this.api
      .delete({ path: `todo/${Id}`, token: this.session.Token || '' })
      .subscribe(() => this.loadTodos());
  };

  showNew = () => {
    this.showDialog('new-todo-dialog');
  };

  hideNew = () => {
    this.hideDialog('new-todo-dialog');
  };

  addTodo = (event: NewTodoForm) => {
    const { Task, Completed } = event;
    if (!Task || Completed == undefined || Completed == null) return;
    this.api
      .post({
        path: 'todo',
        body: { Task, Completed },
        token: this.session.Token || '',
      })
      .subscribe(() => {
        this.hideNew();
        this.loadTodos();
      });
  };

  loadCurrentUser = () => {
    this.api
      .get({
        path: 'user/current',
        token: this.session.Token || undefined,
      })
      .subscribe((result: any) => (this.currentUser = result));
  };

  loadUsers = () => {
    this.api.get({ path: 'user ' }).subscribe((result: any) => {
      this.users = result;
      this.userNames = [];
      for (const user of this.users) {
        if (user.Random) this.userNames.push(user.UserName);
      }
    });
  };

  loadTodos = () => {
    this.api
      .get({ path: 'todo', token: this.session.Token || undefined })
      .subscribe((result: any) => (this.todos = result));
  };

  ngOnInit(): void {
    this.loadUsers();
  }
}
