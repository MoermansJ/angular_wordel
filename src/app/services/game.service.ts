import { Injectable } from '@angular/core';
import { WordService } from './word.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  //properties

  //constructor
  constructor() {}

  //custom methods
  public appendUserWord(word: string, attemptNumber: number): void {
    const wordGrid = document.getElementById('word-grid');

    console.log('word', word);

    for (let i = 0; i < word.length; i++) {
      const divToAppend = document.createElement('div') as HTMLDivElement;
      divToAppend.textContent = word[i];
      divToAppend.style.gridColumn = (i + 1).toString(); //css-grid starts at 1, not 0
      divToAppend.style.gridRow = (attemptNumber - 1).toString(); //placing most recent input ontop
      divToAppend.classList.add('user-attempt-' + attemptNumber);
      wordGrid?.appendChild(divToAppend);
    }
  }

  public paintAppendedWord(
    attemptNumber: number,
    userWord: string,
    computerWord: string
  ): void {
    userWord = userWord.toUpperCase();
    const userWordHtml = document.getElementsByClassName(
      'user-attempt-' + attemptNumber
    );

    //painting elements
    for (let i = 0; i < userWord.length; i++) {
      if (!computerWord.includes(userWord[i])) {
        continue;
      }
      (userWordHtml[i] as HTMLDivElement).style.background =
        userWord[i] === computerWord[i] ? 'green' : 'orange';
    }
  }

  //to do: implement limit for amount of orange characters
}
