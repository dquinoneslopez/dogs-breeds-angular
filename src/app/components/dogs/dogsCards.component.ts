import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Breed } from 'src/app/interfaces/breed';
import { SelectionService } from '../../services/selection.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SearchService } from '../../services/search.service';
import { Card } from 'src/app/interfaces/card';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dogs-cards',
  templateUrl: './dogsCards.component.html',
  styleUrls: ['./dogsCards.component.css']
})
export class DogsCardsComponent implements OnInit, OnDestroy, OnChanges {
  
  @Input() breed = '';
  @Input() search: Breed[] = [];

  private selectedBreeds: Breed[] = [];
  private subscriptions: Subscription[] = [];

  /** Based on the screen size, switch from standard to one column per row */
  cards: Card[] = [];
  pagedList: Card[] = [];
  // MatPaginator Inputs
  length: number = 0;
  pages: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor(
    private selectionService: SelectionService,
    private dataService: DataService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (this.breed) {
      this.selectedBreeds = JSON.parse(localStorage.getItem('sidenav-selection'));
      const detailBreed = this.selectedBreeds.filter(breed => breed.name = this.breed)[0];
      const imgs = JSON.parse(localStorage.getItem('breeds-imgs')).filter(img => img.name === this.breed)[0].imgs;
      imgs.forEach((img: string) => {
        const card = {
          breed: detailBreed,
          images: [img],
          cols: 2,
          rows: 1
        };
        this.cards.push(card);
      });
      this.pagedList = this.cards.slice(0, 3);
      this.length = this.cards.length;  
    }  else {
      this.subscriptions.push(
        this.selectionService.getSelection().subscribe((breeds: Breed[]) => {
          this.setCards(breeds);
        })
      );
    }
  }
  
  ngOnChanges(): void {
    if (this.search.length > 0) {
      this.subscriptions.push(
        this.searchService.getSearch().subscribe(breeds => {
          this.setCards(breeds);
        })
      );
    } else {
      this.setCards([]);
    }
  }

  setCards(breeds: Breed[]): void {
    if (breeds.length > 0) {
      breeds.forEach((breed: Breed) => {
        this.subscriptions.push(
          this.dataService.getImagesByBreed(breed.name).subscribe(imgs => {
            const breedCard = {
              breed,
              images: imgs,
              cols: 2,
              rows: 1
            };
            if (this.cards.filter(card => card.breed.name === breed.name).length === 0) {
              this.cards.push(breedCard);
              let storageImages = JSON.parse(localStorage.getItem('breeds-imgs'));
              const breedImgs = {
                name: breed.name,
                imgs: [...breedCard.images]
              };
              if (storageImages && storageImages.filter(img => img.name === breed.name).length === 0) {
                storageImages = [...storageImages, breedImgs];
                localStorage.setItem('breeds-imgs', JSON.stringify(storageImages));
              } else {
                localStorage.setItem('breeds-imgs', JSON.stringify([breedImgs]));
              }
            } else if (this.cards.length > breeds.length) {
              this.cards = this.cards.filter(card => breeds.find(breedSelected => breedSelected.name === card.breed.name) !== undefined);
            }
            this.pagedList = this.cards.slice(0, 3);
            this.length = this.cards.length;
          })
        );
      });
    } else {
      this.cards = [];
    }
  }
  
  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.cards.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
