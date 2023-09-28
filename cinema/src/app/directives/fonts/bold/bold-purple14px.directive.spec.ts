import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoldPurple14pxDirective } from './bold-purple14px.directive';

@Component({
  template: `<p boldPurple14px>This is a test directive.</p>`
})
class TestComponent {}

describe('BoldPurple14pxDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoldPurple14pxDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(BoldPurple14pxDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should apply the directive styles', () => {
    const element = directiveElement.nativeElement;
    
    expect(element.style.fontSize).toBe('14px');
    expect(element.style.color).toBe('rgb(101, 69, 151)');
    expect(element.style.fontWeight).toBe('bold');
  });
});
