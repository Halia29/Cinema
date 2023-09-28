import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


export function passwordValidator(control: FormControl): { [s: string]: boolean } | null {
  const value = control.value.trim();
  const hasLowercase = /[a-z]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  if ((!hasLowercase || !hasUppercase || !hasNumber) && (value && value !== '')) {
    return { invalidPassword: true };
  }  
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  wasSubmited: boolean;
  hidePassword: boolean;
  email: FormControl;
  password: FormControl;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService){
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.password = new FormControl('', [Validators.required, Validators.minLength(6), passwordValidator]);
  
      this.loginForm = formBuilder.group({
        email: this.email,
        password: this.password
      });
    this.wasSubmited = false;
    this.hidePassword = true;
  }

  onSubmit() {
    this.wasSubmited = true;
    if (this.loginForm.valid) {
      const emailValue = this.loginForm.get('email')?.value;
      const passwordValue = this.loginForm.get('password')?.value;
      
      this.authService.login(emailValue, passwordValue).subscribe((isLoggedIn: boolean) => {
        if(isLoggedIn){
          this.router.navigate(['/home']);          
          this.loginForm.setErrors({'invalidCredentials': false});
        }else{
          this.loginForm.setErrors({'invalidCredentials': true});
        }
      });
    }
  }
}