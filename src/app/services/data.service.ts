import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //properties
  private wordDetails = new BehaviorSubject<HTMLElement | null>(null);

  //constructor
  constructor() {}

  //getters & setters
  setWordDetails(value: HTMLElement) {
    this.wordDetails.next(value);
  }

  getWordDetails(): Observable<HTMLElement | null> {
    return this.wordDetails.asObservable();
  }
}
