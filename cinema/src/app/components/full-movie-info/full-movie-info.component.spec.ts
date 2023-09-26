import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMovieInfoComponent } from './full-movie-info.component';

describe('FullMovieInfoComponent', () => {
  let component: FullMovieInfoComponent;
  let fixture: ComponentFixture<FullMovieInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullMovieInfoComponent]
    });
    fixture = TestBed.createComponent(FullMovieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
