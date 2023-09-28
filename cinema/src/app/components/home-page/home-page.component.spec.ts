import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth/auth.service';
import { API_URL } from './../../constants/settings.constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store'; 
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MovieCarouselComponent } from '../movie-carousel/movie-carousel.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MatCarouselModule } from '@magloft/material-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, NavigationBarComponent, MovieCarouselComponent, MovieDescriptionComponent],
      imports: [
        MatMenuModule,
        MatIconModule,
        MatCarouselModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}), 
        MatToolbarModule
      ],
      providers: [AuthService, {provide: API_URL, useValue: API_URL}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
