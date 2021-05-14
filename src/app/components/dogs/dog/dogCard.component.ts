import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Breed } from 'src/app/interfaces/breed';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { BreedImages } from '../../../interfaces/breed-images';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dogCard.component.html',
  styleUrls: ['./dogCard.component.css']
})
export class DogCardComponent implements OnInit, OnDestroy {

  @Input() card: {
    breed: Breed,
    images: string[],
    cols: number,
    rows: number
  };
  @Input() breed: string;
  
  private breedsImages: BreedImages[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.breedsImages = JSON.parse(localStorage.getItem('breedsImages'));
    // if (!this.breedsImages) {
    //   this.subscriptions.push(
    //     this.dataService.getImagesByBreed(this.card.breed.name).subscribe((images: string[]) => {
    //       this.card.images = [...images];
    //       this.breedsImages = [{name: this.card.breed.name, images: this.card.images}];
    //       localStorage.setItem('breedsImages', JSON.stringify(this.breedsImages));
    //     })
    //   );
    // } else {
    //   this.card.images = this.breedsImages.filter(breed => breed.name === this.card.breed.name)
    //                                       .map(breed => (breed.images))[0];
    //   if (this.card.images) {
    //     this.breedsImages = [...this.breedsImages, {name: this.card.breed.name, images: this.card.images}];
    //     localStorage.setItem('breedsImages', JSON.stringify(this.breedsImages));
    //   } else {
    //     this.subscriptions.push(
    //       this.dataService.getImagesByBreed(this.card.breed.name).subscribe((images: string[]) => {
    //         this.card.images = [...images];
    //         this.breedsImages = [...this.breedsImages, {name: this.card.breed.name, images: this.card.images}];
    //         localStorage.setItem('breedsImages', JSON.stringify(this.breedsImages));
    //       })
    //     );
    //   }
    // }
  }
  
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
