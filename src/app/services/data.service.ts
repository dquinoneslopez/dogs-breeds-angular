import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of, Subscription, forkJoin, combineLatest } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Breed } from '../interfaces/breed';
import { BreedImages } from '../interfaces/breed-images';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private breeds: Breed[] = [];
  private breedsImages: BreedImages[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {
    this.breeds = JSON.parse(localStorage.getItem('breeds'));
    this.breedsImages = JSON.parse(localStorage.getItem('breeds-images'));
  }

  getBreeds(): Observable<Breed[]> {

    if (this.breeds && this.breeds.length > 0) {
      return of(this.breeds);
    }

    return this.httpClient.get('https://dog.ceo/api/breeds/list/all').pipe(
      map((resp: any) => {
        return  Object.entries(resp.message).map((breed: [string, string[]]) => {
          return {
            name: breed[0],
            subBreed: breed[1]
          };
        });
      })
    );
  }

  getImagesByBreed(breed: string): Observable<string[]> {
    const storageImgs = JSON.parse(localStorage.getItem('breeds-imgs'));
    if (storageImgs && storageImgs.filter(imgs => imgs.name === breed).length !== 0) {
      return of(storageImgs.filter(imgs => imgs.name === breed)[0].imgs);
    }
    return  this.httpClient.get(`https://dog.ceo/api/breed/${breed}/images`).pipe(
      map((resp: any) => {
        return resp.message;
      })
    );
  }

  getImagesBySubBreed(breed: string, sub: string): Observable<string[]> {
    return  this.httpClient.get(`https://dog.ceo/api/breed/${breed}-${sub}/images`).pipe(
      map((resp: any) => {
        return resp.message;
      })
    );
  }

}
