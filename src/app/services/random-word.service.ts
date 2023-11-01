import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomWordService {
  //constructor
  constructor(private http: HttpClient) {}

  //custom methods
  public fetchWordBeginningWith(randomCharacter: string): Observable<string> {
    const url = `https://scrabble.collinsdictionary.com/word-lists/five-letter-words-beginning-with-${randomCharacter}/`;
    return this.http.get(url, { responseType: 'text' });
  }

  public fetchWordDetails(word: string): Observable<string> {
    const url = `https://www.woorden.org/woord/${word}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
