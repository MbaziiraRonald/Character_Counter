import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCounterComponent } from './character-counter.component';
import { By } from '@angular/platform-browser';

describe('CharacterCounterComponent', () => {
  let component: CharacterCounterComponent;
  let fixture: ComponentFixture<CharacterCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the character-counter component', () => {
    expect(component).toBeTruthy();
  });

  it(`should render the 'Character Counter'`, () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Character Counter');
  });

  it('should render the textarea', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should call calculateAll method when Count All button is clicked', () => {
    const countButton = fixture.debugElement.query(
      By.css('button.count-button')
    );
    if (!countButton) {
      throw new Error('Count All button not found');
    }

    spyOn(component, 'calculateAll');
    countButton.triggerEventHandler('click', null);

    expect(component.calculateAll).toHaveBeenCalledTimes(1);
  });

  it('should render a list item (li) for each counted word using *ngFor', () => {
    component.specificWordCounts = {
      angular: 3,
      test: 5,
      component: 1,
    };

    fixture.detectChanges();

    const listItems = fixture.nativeElement.querySelectorAll(
      '.word-counts-results li'
    );
    const renderedTexts = Array.from(listItems).map((li) =>
      (li as HTMLLIElement).textContent?.trim()
    );

    expect(listItems.length).toBe(3);
    expect(renderedTexts).toContain("'angular': 3");
    debugger;
    expect(renderedTexts).toContain("'test': 5");
    expect(renderedTexts).toContain("'component': 1");
  });
});
