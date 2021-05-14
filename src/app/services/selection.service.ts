import { Injectable } from '@angular/core';
import { Breed } from '../interfaces/breed';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private selection = new Subject<Breed[]>();
  private selectionObs = this.selection.asObservable();

  constructor() { }

  setSelection(selection: Breed[]): void {
    this.selection.next(selection);
  }

  getSelection(): Observable<Breed[]> {
    return this.selectionObs;
  }

}
