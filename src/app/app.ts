import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
