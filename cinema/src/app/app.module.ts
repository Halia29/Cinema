import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCarouselModule } from '@magloft/material-carousel';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { AuthService } from './services/auth/auth.service';

import { API_URL } from './constants/settings.constants';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MovieCarouselComponent } from './components/movie-carousel/movie-carousel.component';
import { ImageDisplayComponent } from './components/image-display/image-display.component';
import { MovieDescriptionComponent } from './components/movie-description/movie-description.component';
import { MovieSessionsComponent } from './components/movie-sessions/movie-sessions.component';
import { FullMovieInfoComponent } from './components/full-movie-info/full-movie-info.component';
import { DateFormatPipe } from './pipes/date-time.pipes/date-format.pipe';
import { SeatsChartComponent } from './components/seats-chart/seats-chart.component';
import { TimeFormatPipe } from './pipes/date-time.pipes/time-format.pipe';
import { FilterBySeatPipe } from './pipes/seat.pipes/filter-by-seat.pipe';
import { HorizontalSeparatorDirective } from './directives/horizontal-separator/horizontal-separator.directive';
import { PaymentComponent } from './components/payment/payment.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/ticket.reducer';
import { SessionStorageService } from './services/session-storage/session-storage.service';
import { DateTimeFormatPipe } from './pipes/date-time.pipes/date-time-format.pipe';
import { OrderSeatsByRowsPipe } from './pipes/seat.pipes/order-seats-by-rows.pipe';
import { SeatListComponent } from './components/seat-list/seat-list.component';
import { BillComponent } from './components/bill/bill.component';
import { PaymentResultComponent } from './components/payment-result/payment-result.component';
import { PurpleShadowDirective } from './directives/mat-card-style/purple-mat-card.directive';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { Purple14pxDirective } from './directives/fonts/normal/purple14px.directive';
import { BoldPurple14pxDirective } from './directives/fonts/bold/bold-purple14px.directive';
import { GoHomeDirective } from './directives/navigation/home/go-home.directive';
import { GoToSessionsDirective } from './directives/navigation/movie-sessions/go-to-sessions.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    NavigationBarComponent,
    MovieCarouselComponent,
    ImageDisplayComponent,
    MovieDescriptionComponent,
    MovieSessionsComponent,
    FullMovieInfoComponent,
    DateFormatPipe,
    SeatsChartComponent,
    TimeFormatPipe,
    FilterBySeatPipe,
    HorizontalSeparatorDirective,
    PaymentComponent,
    DateTimeFormatPipe,
    OrderSeatsByRowsPipe,
    SeatListComponent,
    BillComponent,
    PaymentResultComponent,
    PurpleShadowDirective,
    MyTicketsComponent,
    Purple14pxDirective,
    BoldPurple14pxDirective,
    GoHomeDirective,
    GoToSessionsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCarouselModule.forRoot(),
    MatGridListModule,
    MatTabsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ticket: reducer})
  ],
  exports: [RouterModule],
  providers: [AuthService, {provide: API_URL, useValue: API_URL}, SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
