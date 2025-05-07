import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WordCounterService } from '../word-counter.service';
@Component({
  selector: 'app-character-counter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.css'],
})
export class CharacterCounterComponent {
  inputText: string = '';
  vowelCount: number | null = null;
  consonantCount: number | null = null;
  letterCount: number | null = null;
  numberCount: number | null = null;
  errorMessage: string = '';
  wordsToCountInput: string = '';
  specificWordCounts: Record<string, number> | null = null;

  // --- Inject the Service ---
  constructor(private wordCounterService: WordCounterService) {}

  calculateAll(): void {
    this.calculateBasicCounts();
    this.calculateSpecificWordCounts();
  }

  calculateBasicCounts(): void {
    const text = this.inputText || '';
    this.vowelCount = (text.match(/[aeiou]/gi) || []).length;
    this.consonantCount = (
      text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []
    ).length;
    this.letterCount = (text.match(/[a-z]/gi) || []).length;
    this.numberCount = (text.match(/[0-9]/gi) || []).length;
  }

  calculateSpecificWordCounts(): void {
    const wordsArray = this.wordsToCountInput
      .split(',')
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    this.specificWordCounts = this.wordCounterService.countSpecificWords(
      this.inputText,
      wordsArray
    );
  }

  clearFields(): void {
    this.inputText = '';
    this.vowelCount = null;
    this.consonantCount = null;
    this.letterCount = null;
    this.numberCount = null;
    this.errorMessage = '';
    this.wordsToCountInput = '';
    this.specificWordCounts = null;
  }
}
