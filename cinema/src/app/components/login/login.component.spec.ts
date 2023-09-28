import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { passwordValidator } from './login.component';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form controls', () => {
    expect(component.email.valid).toBe(false);
    expect(component.password.valid).toBe(false);
  });

  it('should submit the form with valid data', () => {
    component.email.setValue('admin@email.com');
    component.password.setValue('AdminPass1234');
    authService.login.and.returnValue(of(true));
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('admin@email.com', 'AdminPass1234');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.loginForm.hasError('invalidCredentials')).toBeFalse;
  });

  it('should handle invalid login', () => {
    component.email.setValue('testexample.com');
    component.password.setValue('invalidPassword');
    authService.login.and.returnValue(of(false));
    component.onSubmit();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.loginForm.hasError('invalidCredentials')).toBeTrue;
  });
});

describe('passwordValidator', () => {
  it('should return null for a valid password', () => {
    const control = new FormControl('ValidPassword123');
    const result = passwordValidator(control);
    expect(result).toBeNull();
  });

  it('should return null for an empty password', () => {
    const control = new FormControl('');
    const result = passwordValidator(control);
    expect(result).toBeNull();
  });

  it('should return { invalidPassword: true } for a password without lowercase letters', () => {
    const control = new FormControl('PASSWORD123');
    const result = passwordValidator(control);
    expect(result).toEqual({ invalidPassword: true });
  });

  it('should return { invalidPassword: true } for a password without uppercase letters', () => {
    const control = new FormControl('password123');
    const result = passwordValidator(control);
    expect(result).toEqual({ invalidPassword: true });
  });

  it('should return { invalidPassword: true } for a password without numbers', () => {
    const control = new FormControl('PasswordWithoutNumbers');
    const result = passwordValidator(control);
    expect(result).toEqual({ invalidPassword: true });
  });

  it('should return null for a password with special characters', () => {
    const control = new FormControl('P@ssw0rd');
    const result = passwordValidator(control);
    expect(result).toBeNull();
  });
});
