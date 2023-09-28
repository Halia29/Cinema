import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { API_URL } from './../../constants/settings.constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store'; 

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let mockAuthService: AuthService;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [
        MatMenuModule,
        MatIconModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}), 
        MatToolbarModule
      ],
      providers: [AuthService, {provide: API_URL, useValue: API_URL}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService);
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open user profile settings menu', () => {
    const openMenuSpy = spyOn(component.menuTrigger, 'openMenu');
    component.openUserProfileSettings();
    expect(openMenuSpy).toHaveBeenCalled();
  });

  it('should navigate to my tickets', () => {
    const navigateSpy = spyOn(mockRouter, 'navigate'); 
    component.goToMyTickets();
    expect(navigateSpy).toHaveBeenCalledWith(['./myTickets']); 
  });
  
  it('should log out and navigate to login', () => {
    const navigateSpy = spyOn(mockRouter, 'navigate'); 
    const authSpy = spyOn(mockAuthService, 'logout');
    component.logOut();
    expect(authSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['./login']);
  });

});
