import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSessionsComponent } from './movie-sessions.component';

describe('MovieSessionsComponent', () => {
  let component: MovieSessionsComponent;
  let fixture: ComponentFixture<MovieSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSessionsComponent]
    });
    fixture = TestBed.createComponent(MovieSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
