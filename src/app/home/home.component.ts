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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopBarComponent,
    BottomBarComponent,
    RegisterDialogComponent,
    SignInDialogComponent,
    RandomDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  users: User[] = [];
  userNames: string[] = [];
  currentUser: User | null = null;
  session: SessionStorage = new SessionStorage();

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
    console.log(event);
    this.hideRegister();
  };

  showSignIn = () => {
    this.showDialog('sign-in-dialog');
  };

  hideSignIn = () => {
    this.hideDialog('sign-in-dialog');
  };

  signIn = (event: SignInForm) => {
    console.log(event);
  };

  showRandom = () => {
    this.showDialog('random-dialog');
  };

  hideRandom = () => {
    this.hideDialog('random-dialog');
  };

  randomSignIn = (event: RandomForm) => {
    console.log(event);
    this.hideRandom();
  };

  loadCurrentUser = () => {
    this.api
      .get({
        path: 'user/current',
        token: this.session.data.Token || undefined,
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
      .get({ path: 'todo', token: this.session.data.Token || undefined })
      .subscribe((result: any) => (this.todos = result));
  };

  ngOnInit(): void {
    this.loadUsers();
  }
}
