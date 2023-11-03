import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  //properties
  public computerWordCharArray: string[] = [];
  public computerWord: string = '';
  public wordDetails: Element | null = null;
  public inputValues: string[] = [];
  public attemptCounter: number = 7;

  //constructor
  public constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private gameService: GameService,
    private http: HttpClient
  ) {}

  //custom methods
  public ngOnInit(): void {
    this.getRandomWord();
  }

  public getRandomWord(): void {
    const randomIndex = (array: any): number =>
      Math.floor(Math.random() * array.length);
    const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar: string = alphabet.charAt(randomIndex(alphabet));

    this.fetchWordBeginningWith(randomChar).subscribe({
      next: (response: string) => {
        let parsedHTML = new DOMParser().parseFromString(response, 'text/html');
        const fiveLetterWords = Array.from(
          parsedHTML.querySelector('.letter_table')?.children as HTMLCollection
        ).filter((element) => element.textContent?.length == 5);

        this.computerWord = fiveLetterWords[randomIndex(fiveLetterWords)]
          .textContent as string;

        this.computerWordCharArray = Array.from(this.computerWord);
      },
      error: (error: any) => console.log(error),
    });
  }

  public handleCheck(): void {
    //if user hasn't entered enough characters
    if (
      this.inputValues.filter((string) => string.trim().length > 0).length !=
      this.computerWord.length
    ) {
      return;
    }

    const userWord = this.inputValues.join('').toUpperCase();

    //creating div elements based on user word
    this.attemptCounter--;
    const wordGrid = this.el.nativeElement.querySelector('#word-grid');

    for (let i = 0; i < userWord.length; i++) {
      const divToAppend = this.renderer.createElement('div') as HTMLDivElement;
      divToAppend.textContent = userWord[i];
      divToAppend.style.gridColumn = (i + 1).toString(); //css-grid starts at 1, not 0
      divToAppend.style.gridRow = (this.attemptCounter - 1).toString(); //placing most recent input ontop
      this.renderer.appendChild(wordGrid, divToAppend);
    }

    //resetting input fields for UX

    //painting user word div elements
    this.gameService.appendUserWord(userWord, this.attemptCounter);

    console.log(userWord);
    console.log(this.computerWord);

    this.gameService.paintAppendedWord(
      this.attemptCounter,
      userWord,
      this.computerWord
    );

    this.inputValues = [];

    // const targetElement = this.renderer.selectRootElement(
    //   '#external-html'
    // ) as HTMLElement;

    // //clearing previous html
    // this.renderer.setProperty(targetElement, 'innerHTML', '');

    //appending html
    // this.renderer.appendChild(
    //   targetElement,
    //   this.wordService.getWordDetails(this.computerWord)
    // );

    if (userWord === this.computerWord) {
      console.log('you won, congratulations');
    }
  }

  private fetchWordBeginningWith(randomCharacter: string): Observable<string> {
    const url = `https://scrabble.collinsdictionary.com/word-lists/five-letter-words-beginning-with-${randomCharacter}/`;
    return this.http.get(url, { responseType: 'text' });
  }

  public jumpToNextOrPrevious(event: Event, currentIndex: number): void {
    const key = (event as KeyboardEvent).key.toUpperCase();
    const currentElement = event.target as HTMLInputElement;

    switch (key) {
      case 'BACKSPACE':
      case 'DELETE':
        this.jumpToPrevious(key, currentElement, currentIndex);
        break;
      default:
        this.jumpToNext(key, currentElement, currentIndex);
    }
  }

  private jumpToPrevious(
    key: string,
    element: HTMLInputElement,
    elementIndex: number
  ): void {
    //going backward
    if (key === 'BACKSPACE' || key === 'DELETE') {
      if (elementIndex <= 0) {
        return;
      }

      const previousInputId = 'char-input-' + (elementIndex - 1);
      const previousInput = document.getElementById(
        previousInputId
      ) as HTMLInputElement;

      previousInput.focus();
    }
  }

  private jumpToNext(
    key: string,
    element: HTMLInputElement,
    elementIndex: number
  ): void {
    //check if the pressed key matches regex AND pressed key is a character
    const regex: RegExp = /[A-Z]/; //A - Z
    if (!regex.test(key) || key.length >= 2) {
      return;
    }

    // element.value = key;

    if (elementIndex === this.computerWord.length - 1) {
      return;
    }

    //shifting focus
    const nextInput = document.getElementById(
      'char-input-' + (elementIndex + 1)
    ) as HTMLInputElement;
    nextInput.focus();
  }
}
