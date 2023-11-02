import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  //properties

  //constructor
  constructor(private http: HttpClient) {}

  //custom methods
  public getWordDetails(word: string): Element {
    let wordDetailsHtml: Element = {} as Element;

    this.fetchWordDetails(word).subscribe({
      next: (response: string) => {
        let parsedHTML = new DOMParser().parseFromString(response, 'text/html');
        const externalHTML = Array.from(
          parsedHTML.querySelector('.right')?.children as HTMLCollection
        )[1];
        wordDetailsHtml = externalHTML;
      },

      error: (error) => console.log(error),
    });

    return wordDetailsHtml;
  }

  private fetchWordDetails(word: string): Observable<string> {
    const url = `https://www.woorden.org/woord/${word}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
