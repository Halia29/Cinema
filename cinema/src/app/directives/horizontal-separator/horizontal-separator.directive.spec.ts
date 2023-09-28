import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HorizontalSeparatorDirective } from './horizontal-separator.directive';

@Component({
  template: `<div horizontal-separator></div>`
})
class TestComponent {}

describe('HorizontalSeparatorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalSeparatorDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(HorizontalSeparatorDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should apply the directive styles', () => {
    const element = directiveElement.nativeElement;
    
    expect(element.style.borderTop).toBe('1px solid rgba(103, 58, 183, 0.8)');
    expect(element.style.margin).toBe('10px auto');
    expect(element.style.width).toBe('95%');
  });
});
