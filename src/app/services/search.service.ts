import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Breed } from '../interfaces/breed';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchOptions = [];
  public breedsData: Breed[] = [];

  constructor() { }

  filteredListOptions(): Breed[] {
    const filteredBreedstsList: Breed[] = [];
    for (const breed of this.breedsData) {
      for (const options of this.searchOptions) {
          if (options.name === breed.name) {
            filteredBreedstsList.push(breed);
          }
      }
    }
    return filteredBreedstsList;
  }
  
  getSearch(): Observable<Breed[]> {
    return of(this.searchOptions);
  }
  
}
