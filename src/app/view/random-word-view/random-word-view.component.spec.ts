import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomWordViewComponent } from './random-word-view.component';

describe('RandomWordViewComponent', () => {
  let component: RandomWordViewComponent;
  let fixture: ComponentFixture<RandomWordViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomWordViewComponent]
    });
    fixture = TestBed.createComponent(RandomWordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
