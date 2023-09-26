import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(
    private router: Router,
    private authService: AuthService){  
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
