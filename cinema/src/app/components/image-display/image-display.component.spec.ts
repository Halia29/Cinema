import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDisplayComponent } from './image-display.component';
import { Component } from '@angular/core';


@Component({
  selector: 'app-test-img',
  template: '<app-image-display [imageUrl]="imageUrl"></app-image-display>'
})
class TestImageDisplayComponent {
  imageUrl: string;
}

describe('ImageDisplayComponent', () => {
  let testImage: TestImageDisplayComponent;
  let fixture: ComponentFixture<TestImageDisplayComponent>;
  let imageDisplayElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDisplayComponent, TestImageDisplayComponent]
    });

    fixture = TestBed.createComponent(TestImageDisplayComponent);
    testImage = fixture.componentInstance;
    imageDisplayElement = fixture.nativeElement.querySelector('app-image-display');

    TestBed.compileComponents();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(testImage).toBeTruthy();
  });

  it('should display the provided imageUrl', () => {
    const imageUrl = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dailydot.com%2Funclick%2Fpolite-cat-ollie-memes%2F&psig=AOvVaw0f8JpPuSQ6CIzfqfD_IkA4&ust=1695929667538000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKCto7zEy4EDFQAAAAAdAAAAABAb';
    testImage.imageUrl = imageUrl;
    fixture.detectChanges();

    const imgElement: HTMLImageElement | null = imageDisplayElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement?.src).toBe(imageUrl);
  })
});