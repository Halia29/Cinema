import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentResultComponent } from './payment-result.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { API_URL } from 'src/app/constants/settings.constants';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('PaymentResultComponent', () => {
  let component: PaymentResultComponent;
  let fixture: ComponentFixture<PaymentResultComponent>;
  let storeMock: Store<{ ticket: Ticket  }>;
  let activatedRouteMock: any;
  let routerMock: any;

  beforeEach(() => {
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('getParamMap').and.returnValue('10.5'),
        },
      },
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };
    
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of({ ticket: {} })),
    } as any;

    TestBed.configureTestingModule({
      declarations: [PaymentResultComponent, NavigationBarComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatToolbarModule, MatIconModule, MatMenuModule], 
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: API_URL, useValue: API_URL },
      ],
    });

    fixture = TestBed.createComponent(PaymentResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the change property from the route parameter', () => {
    activatedRouteMock.snapshot.paramMap.get.and.returnValue('10.5');
    fixture.detectChanges();
    expect(component.change).toEqual(10.5);
  });

  it('should handle invalid route parameter', () => {
    activatedRouteMock.snapshot.paramMap.get.and.returnValue({ get: (key: string) => 'invalid' });

    fixture.detectChanges();
    expect(component.change).toBe(0);
  });
});
