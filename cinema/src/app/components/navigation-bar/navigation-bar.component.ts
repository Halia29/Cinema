import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  constructor(private router: Router, private authService: AuthService){}

  openUserProfileSettings(){
    this.menuTrigger.openMenu();
  }

  goToMyTickets() {
    this.router.navigate(['./myTickets']);
  }

  
  logOut() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }
}
