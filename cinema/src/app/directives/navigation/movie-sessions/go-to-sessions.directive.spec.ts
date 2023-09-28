import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GoToSessionsDirective } from './go-to-sessions.directive';
import * as TicketActions from './../../../actions/ticket.actions';
import { of } from 'rxjs';

@Component({
  template: `<button [goToSessions]="movieTitle">Go To Sessions</button>`
})
class TestComponent {
  movieTitle: string;
}

class MockStore {
  dispatch(action: any): void {}
}

class MockRouter {
  navigate(url: any[]): void {}
}

describe('GoToSessionsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let buttonElement: DebugElement;
  let store: MockStore;
  let router: MockRouter;

  beforeEach(() => {
    store = new MockStore();
    router = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [GoToSessionsDirective, TestComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.directive(GoToSessionsDirective));

    fixture.detectChanges();
  });

  it('should create an instance of the directive', () => {
    expect(buttonElement).toBeTruthy();
  });

  it('should dispatch setMovieTitle and navigate when title is provided', () => {
    const movieTitle = 'Movie';
    testComponent.movieTitle = movieTitle;

    const dispatchSpy = spyOn(store, 'dispatch');
    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      TicketActions.setMovieTitle({ title: movieTitle })
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/movie']);
  });
});
