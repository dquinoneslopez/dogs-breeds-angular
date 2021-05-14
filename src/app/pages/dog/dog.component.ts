import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breed } from 'src/app/interfaces/breed';
import { BreedImages } from '../../interfaces/breed-images';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit {

  private breeds: Breed[] = [];
  private breedsImages: BreedImages[] = [];
  private breedImages: BreedImages = {
    name: '',
    images: []
  };
  public breedName = '';

  constructor(
    private router: Router
  ) {
    const splittedRoute = router.url.split('/');
    this.breedName = splittedRoute[splittedRoute.length - 1];
  }

  ngOnInit(): void {
    this.breeds = JSON.parse(localStorage.getItem('breeds'));
    if (this.breeds.filter(breed => breed.name === this.breedName).length === 0) {
      this.router.navigate(['/home']);
    } else {
      this.breedsImages = JSON.parse(localStorage.getItem('breedsImages'));
      if (this.breedsImages) {
        this.breedImages = this.breedsImages.filter(breed => breed.name === this.breedName)[0];
      }
    }
  }

}
