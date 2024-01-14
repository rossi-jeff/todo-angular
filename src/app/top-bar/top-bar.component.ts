import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SessionData } from '../../types/session-data.type';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  @Input() session!: SessionData;
  @Output() register = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<void>();
  @Output() random = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();

  registerClicked = () => this.register.emit();

  signInClicked = () => this.signIn.emit();

  randomClicked = () => this.random.emit();

  signOutClicked = () => this.signOut.emit();
}
