import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsChartComponent } from './seats-chart.component';

describe('SeatsChartComponent', () => {
  let component: SeatsChartComponent;
  let fixture: ComponentFixture<SeatsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatsChartComponent]
    });
    fixture = TestBed.createComponent(SeatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
