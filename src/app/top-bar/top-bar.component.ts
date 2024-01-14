import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  @Output() register = new EventEmitter<void>();
  @Output() signIn = new EventEmitter<void>();
  @Output() random = new EventEmitter<void>();

  registerClicked = () => this.register.emit();

  signInClicked = () => this.signIn.emit();

  randomClicked = () => this.random.emit();
}
