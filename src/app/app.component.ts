import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterCounterComponent } from './character-counter/character-counter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharacterCounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'character_counter';
}
