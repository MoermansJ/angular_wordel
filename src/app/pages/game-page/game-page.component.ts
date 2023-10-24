import { Component } from '@angular/core';
import { RandomWordService } from 'src/app/services/random-word.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent {
  //properties
  public _randomWord: string[] = [];

  //constructor
  public constructor(private randomWordService: RandomWordService) {}

  //getters & setters
  public get randomWord(): string[] {
    return this._randomWord;
  }

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

        this._randomWord = [
          ...(fiveLetterWords[randomIndex(fiveLetterWords)]
            .textContent as string),
        ];
      },

      error: (error) => console.log(error),
    });
  }
}
