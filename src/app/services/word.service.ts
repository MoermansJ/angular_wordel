import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  //properties

  //constructor
  constructor(private http: HttpClient, private dataService: DataService) {}

  //custom methods
  public getWordDetails(word: string): void {
    this.fetchWordDetails(word).subscribe({
      next: (response: string) => {
        let parsedHtml = new DOMParser().parseFromString(response, 'text/html');
        const externalHtml = Array.from(
          parsedHtml.querySelector('.right')?.children as HTMLCollection
        )[1] as HTMLDivElement;
        this.dataService.setWordDetails(externalHtml);
      },

      error: (error) => console.log(error),
    });
  }

  private fetchWordDetails(word: string): Observable<string> {
    const url = `https://www.woorden.org/woord/${word}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
