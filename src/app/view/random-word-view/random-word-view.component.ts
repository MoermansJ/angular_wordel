import { Component } from '@angular/core';
import { RandomWordService } from 'src/app/services/RandomWordService/random-word.service';

@Component({
  selector: 'app-random-word-view',
  templateUrl: './random-word-view.component.html',
  styleUrls: ['./random-word-view.component.css'],
})
export class RandomWordViewComponent {
  //properties
  public _randomWord: string = '';

  //constructor
  public constructor(private randomWordService: RandomWordService) {}

  //getters & setters
  public get randomWord(): string {
    return this._randomWord;
  }

  //custom methods
  ngOnInit(): void {
    this.getRandomWord();
  }

  public getRandomWord(): void {
    const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = (array: any): number => {
      return Math.floor(Math.random() * array.length);
    };

    const randomChar: string = alphabet.charAt(randomIndex(alphabet));
    this.randomWordService.fetchWordBeginningWith(randomChar).subscribe({
      next: (response: string) => {
        let parsedHTML = new DOMParser().parseFromString(response, 'text/html');
        const fiveLetterWords = Array.from(
          parsedHTML.querySelector('.letter_table')?.children as HTMLCollection
        ).filter((element) => element.textContent?.length == 5);

        this._randomWord = fiveLetterWords[randomIndex(fiveLetterWords)]
          .textContent as string;
      },

      error: (error) => console.log(error),
    });
  }
}
