import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


function passwordValidator(control: FormControl): { [s: string]: boolean } | null {
  const hasLowercase = /[a-z]/.test(control.value);
  const hasUppercase = /[A-Z]/.test(control.value);
  const hasNumber = /[0-9]/.test(control.value);
  if ((!hasLowercase || !hasUppercase || !hasNumber) && (control.value && control.value.trim() !== '')) {
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

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService){
    this.loginForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6), passwordValidator])]
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
