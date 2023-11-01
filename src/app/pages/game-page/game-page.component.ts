import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RandomWordService } from 'src/app/services/random-word.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent {
  //properties
  public randomWordCharArray: string[] = [];
  public randomWord: string = '';
  public wordDetails: Element | null = null;
  public inputValues: string[] = [];
  private attemptCounter: number = 7;

  //constructor
  public constructor(
    private randomWordService: RandomWordService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  //custom methods
  ngOnInit(): void {
    this.getRandomWord();
  }

  public getRandomWord(): void {
    const randomIndex = (array: any): number => {
      return Math.floor(Math.random() * array.length);
    };
    const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar: string = alphabet.charAt(randomIndex(alphabet));

    this.randomWordService.fetchWordBeginningWith(randomChar).subscribe({
      next: (response: string) => {
        let parsedHTML = new DOMParser().parseFromString(response, 'text/html');
        const fiveLetterWords = Array.from(
          parsedHTML.querySelector('.letter_table')?.children as HTMLCollection
        ).filter((element) => element.textContent?.length == 5);

        this.randomWord = fiveLetterWords[randomIndex(fiveLetterWords)]
          .textContent as string;
        this.randomWordCharArray = [...this.randomWord];

        // this.getWordDetails(this.randomWord);
      },

      error: (error) => console.log(error),
    });
  }

  public getWordDetails(word: string): void {
    this.randomWordService.fetchWordDetails(word).subscribe({
      next: (response: string) => {
        let parsedHTML = new DOMParser().parseFromString(response, 'text/html');
        const externalHTML = Array.from(
          parsedHTML.querySelector('.right')?.children as HTMLCollection
        )[1];
        this.wordDetails = externalHTML;
        console.log('fetched details', this.wordDetails);

        const targetElement = this.renderer.selectRootElement('#external-html');

        //clearing previous html
        this.renderer.setProperty(targetElement, 'innerHTML', '');

        //appending html
        this.renderer.appendChild(targetElement, externalHTML);
      },

      error: (error) => console.log(error),
    });
  }

  public handleCheck(): void {
    //if user hasn't entered enough characters
    if (this.inputValues.length != this.randomWordCharArray.length) {
      return;
    }

    this.attemptCounter--;
    const wordGrid = this.el.nativeElement.querySelector('#word-grid');

    for (let i = 0; i < this.inputValues.length; i++) {
      const divToAppend = this.renderer.createElement('div') as HTMLDivElement;
      divToAppend.textContent = this.inputValues[i];
      divToAppend.style.gridColumn = (i + 1).toString(); //css-grid starts at 1, not 0
      divToAppend.style.gridRow = (this.attemptCounter - 1).toString(); //placing most recent input ontop
      this.renderer.appendChild(wordGrid, divToAppend);
    }

    this.inputValues = [];
  }

  public jumpToNextOrPrevious(event: Event, currentIndex: number): void {
    const key = (event as KeyboardEvent).key.toUpperCase();
    const currentElement = event.target as HTMLInputElement;
    event.preventDefault();

    //going backward
    if (key === 'BACKSPACE' || key === 'DELETE') {
      currentElement.value = '';

      if (currentIndex <= 0) {
        return;
      }

      if (currentElement.value !== '') {
        currentElement.value = '';
        return;
      }

      const previousInputId = 'char-input-' + (currentIndex - 1);
      const previousInput = document.getElementById(
        previousInputId
      ) as HTMLInputElement;

      previousInput.focus();
      return;
    }

    //check if the pressed key matches regex AND pressed key is a character
    const regex: RegExp = /[A-Z]/; //A - Z
    if (!regex.test(key) || key.length >= 2) {
      return;
    }

    currentElement.value = key;

    if (currentIndex >= this.randomWord.length - 1) {
      return;
    }

    //shifting focus
    const nextInput = document.getElementById(
      'char-input-' + (currentIndex + 1)
    ) as HTMLInputElement;
    nextInput.focus();
  }
}
