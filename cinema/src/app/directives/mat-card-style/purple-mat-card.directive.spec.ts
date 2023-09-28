import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PurpleShadowDirective  } from './purple-mat-card.directive';

@Component({
  template: `<p purpleShadow>This is a test directive.</p>`
})
class TestComponent {}

describe('PurpleShadowDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurpleShadowDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(PurpleShadowDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should apply the directive styles', () => {
    const element = directiveElement.nativeElement;
    
    expect(element.style.boxShadow).toBe('rgba(103, 58, 183, 0.2) 4px 4px 6px 4px');
  });
});
