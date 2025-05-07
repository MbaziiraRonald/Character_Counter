import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class WordCounterService {
  constructor() {}

  /**
   * Counts occurrences of specific words within a given text.
   * The count is case-insensitive.
   *
   * @param text The main body of text to search within.
   * @param wordsToCount An array of strings representing the words to count.
   * @returns A Record (object) where keys are the words (lowercase)
   * from wordsToCount and values are their counts in the text.
   */
  countSpecificWords(
    text: string | null | undefined,
    wordsToCount: string[] | null | undefined
  ): Record<string, number> {
    // Initialize result object
    const wordCounts: Record<string, number> = {};

    // --- Input Validation ---
    if (!text || !wordsToCount || wordsToCount.length === 0) {
      // If no text or no words to count are provided, return empty counts
      // Initialize counts to 0 for the provided words if they exist
      (wordsToCount || []).forEach((word) => {
        if (word && typeof word === 'string') {
          wordCounts[word.trim().toLowerCase()] = 0;
        }
      });
      return wordCounts;
    }

    // --- Prepare Data for Case-Insensitive Counting ---

    // 1. Normalize words to count: lowercase and trim whitespace.
    //    Also initialize their counts to 0 in the result map.
    const uniqueWordsToCountLower: Set<string> = new Set();
    wordsToCount.forEach((word) => {
      if (word && typeof word === 'string') {
        // Ensure it's a non-empty string
        const lowerWord = word.trim().toLowerCase();
        if (lowerWord) {
          // Avoid counting empty strings if user enters ", ,"
          wordCounts[lowerWord] = 0; // Initialize count
          uniqueWordsToCountLower.add(lowerWord); // Add to Set for quick lookup
        }
      }
    });

    // If after processing, there are no valid words to count, return initialized counts
    if (uniqueWordsToCountLower.size === 0) {
      return wordCounts;
    }

    // 2. Normalize and split the input text into words
    //    Convert text to lowercase. Split by non-word characters (spaces, punctuation, etc.)
    //    This regex splits by one or more characters that are NOT letters, numbers, or underscores.
    const wordsInText = text.toLowerCase().split(/[^a-z0-9_]+/);

    // --- Counting Logic ---
    wordsInText.forEach((wordInText) => {
      // Check if the word from the text is one we are looking for
      if (wordInText && uniqueWordsToCountLower.has(wordInText)) {
        wordCounts[wordInText]++; // Increment the count for that word
      }
    });

    return wordCounts;
  }
}