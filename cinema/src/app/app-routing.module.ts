import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { FullMovieInfoComponent } from './components/full-movie-info/full-movie-info.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentResultComponent } from './components/payment-result/payment-result.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomePageComponent, canActivate: [AuthGuard] },
  { path: "movie", component: FullMovieInfoComponent, canActivate: [AuthGuard] },
  { path: "pay", component: PaymentComponent, canActivate: [AuthGuard] },
  { path: "transaction-result/:changeAmount", component: PaymentResultComponent, canActivate: [AuthGuard] },
  { path: "myTickets", component: MyTicketsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
