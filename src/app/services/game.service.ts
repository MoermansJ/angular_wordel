import { Injectable } from '@angular/core';

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

    //creating divs for individual letters
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
    const userWordHtml = document.getElementsByClassName(
      'user-attempt-' + attemptNumber
    );

    const availableOrangeCharacters = this.calculateAvailableOrangeCharacters(
      userWord,
      computerWord
    );

    for (let i = 0; i < userWord.length; i++) {
      const currentLetter = userWordHtml[i] as HTMLDivElement;

      if (userWord[i] === computerWord[i]) {
        currentLetter.style.background = 'green';
        availableOrangeCharacters[userWord[i]] -= 1;
        continue;
      }

      if (availableOrangeCharacters[userWord[i]] >= 1) {
        currentLetter.style.background = 'orange';
        availableOrangeCharacters[userWord[i]] -= 1;
      }
    }
  }

  private calculateAvailableOrangeCharacters(
    userWord: string,
    computerWord: string
  ): { [key: string]: number } {
    const characterMap: { [key: string]: number } = {};

    for (let i = 0; i < computerWord.length; i++) {
      if (!computerWord.includes(userWord[i])) {
        continue;
      }

      const computerCharacter = computerWord[i];

      if (characterMap[computerCharacter]) {
        // If the character is already a key, increment its value.
        characterMap[computerCharacter]++;
        continue;
      }

      // If the character is not a key, add it with a value of 1.
      characterMap[computerCharacter] = 1;
    }

    return characterMap;
  }
}
