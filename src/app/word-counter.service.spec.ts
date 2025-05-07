import { TestBed } from '@angular/core/testing';
import { WordCounterService } from './word-counter.service';

describe('WordCounterService', () => {
  let service: WordCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide the actual service, as it has no dependencies to mock
      providers: [WordCounterService],
    });
    // Inject the service instance before each test
    service = TestBed.inject(WordCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct counts for specified words', () => {
    const text = 'Unlike traditional low-code/no-code solutions, KaneAI is built to scale seamlessly, handling complex workflows across all major programming languages and frameworks.';

    const wordsToCount = ['complex', 'frameworks', 'solutions'];
    const expectedCounts = { complex: 1, frameworks: 1, solutions: 1 }; 

    const result = service.countSpecificWords(text, wordsToCount);

    expect(result).toEqual(expectedCounts);
  });

  it('should return count 0 for words not found in the text', () => {
    const text = 'Creating: Use KaneAI to generate test scenarios in natural language effortlessly.';

    const wordsToCount = ['empire', 'generate', 'zebra'];
    const expectedCounts = { empire: 0, generate: 1, zebra: 0 };

    const result = service.countSpecificWords(text, wordsToCount);

    expect(result).toEqual(expectedCounts);
  });

  it('should handle words next to punctuation correctly', () => {
    const text = 'Real Device Cloud, Browser Testing, and HyperExecute Cloud.';
    const wordsToCount = ['testing', 'cloud'];
    const expectedCounts = { testing: 1, cloud: 2 };

    const result = service.countSpecificWords(text, wordsToCount);

    expect(result).toEqual(expectedCounts);
  });

  it('should handle different cases in wordsToCount array', () => {
    const text = 'Planning, CREATING, ExecUting, Debugging, reporting';
    const wordsToCount = ['Planning', 'CREATING', 'ExecUting']; 
    const expectedCounts = { planning: 1, creating: 1, executing: 1 }; 
    const result = service.countSpecificWords(text, wordsToCount);

    expect(result).toEqual(expectedCounts);
  });

  it('should return initialized counts (0) if text is null or undefined', () => {
    const wordsToCount = ['test', 'word'];
    const expectedCounts = { test: 0, word: 0 };

    expect(service.countSpecificWords(null, wordsToCount)).toEqual(
      expectedCounts
    );

    expect(service.countSpecificWords(undefined, wordsToCount)).toEqual(
      expectedCounts
    );
  });

  it('should return initialized counts (0) if text is an empty string', () => {
    const wordsToCount = ['Execute', 'Debug', 'Success', 'Report'];
    const expectedCounts = {execute: 0, debug: 0, success: 0, report: 0 };

    expect(service.countSpecificWords('', wordsToCount)).toEqual(
      expectedCounts
    );
  });

  it('should return an empty object if wordsToCount is null, undefined, or empty array', () => {
    const text = 'Some text here';
    const expectedCounts = {};

    expect(service.countSpecificWords(text, null)).toEqual(expectedCounts);
    expect(service.countSpecificWords(text, undefined)).toEqual(expectedCounts);
    expect(service.countSpecificWords(text, [])).toEqual(expectedCounts);
  });

  it('should ignore empty strings or whitespace-only strings in wordsToCount array', () => {
    const text = 'Count this word, not that one.';
    const wordsToCount = [
      'this',
      ' ',
      '',
      'word',
      null as any,
      undefined as any,
    ];
    const expectedCounts = { this: 1, word: 1 }; 

    const result = service.countSpecificWords(text, wordsToCount);

    expect(result).toEqual(expectedCounts);
  });

  it('should handle text with multiple spaces or different whitespace correctly', () => {
    const text = 'Tab\tseparated  DoubleSpace\nNewLine';
    const wordsToCount = ['tab', 'separated', 'doublespace', 'newline'];
    const expectedCounts = { tab: 1, separated: 1, doublespace: 1, newline: 1 };

    const result = service.countSpecificWords(text, wordsToCount);

    expect(result).toEqual(expectedCounts);
  });
});
