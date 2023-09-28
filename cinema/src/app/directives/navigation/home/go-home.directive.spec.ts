import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GoHomeDirective } from './go-home.directive';
import { Router } from '@angular/router';

@Component({
  template: `<button goHome>Go Home</button>`
})
class TestComponent {}

describe('GoHomeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let buttonElement: DebugElement;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoHomeDirective, TestComponent],
      providers: [Router],
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.directive(GoHomeDirective));
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create an instance of the directive', () => {
    expect(buttonElement).toBeTruthy();
  });

  it('should navigate to home on click', () => {
    const routerSpy = spyOn(router, 'navigate');

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalledWith(['./home']);
  });
});
