import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breed } from './interfaces/breed';
import { BreedImages } from './interfaces/breed-images';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Dogs Breeds';
  
  private breeds: Breed[] = [];
  private breedsImages: BreedImages[] = [];
  private subscriptions: Subscription[] = [];

  
  constructor(
    private dataService: DataService
  ) {}
  
  ngOnInit(): void {
    this.breeds = JSON.parse(localStorage.getItem('breeds'));
    if (!this.breeds) {
      this.subscriptions.push(
        this.dataService.getBreeds().subscribe(breeds => {
          this.breeds = [...breeds];
          localStorage.setItem('breeds', JSON.stringify(breeds));
        })
      );
    } else {
      this.breeds.forEach(breed => {
        this.subscriptions.push(
          this.dataService.getImagesByBreed(breed.name).subscribe(imgs =>{
            this.breedsImages = [...this.breedsImages, {name: breed.name, images: [...imgs]}];
          }
          )
        );
      });
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
