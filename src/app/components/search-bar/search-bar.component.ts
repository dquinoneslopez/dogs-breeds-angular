import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Breed } from 'src/app/interfaces/breed';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  // allPosts: Post[];
  breeds: Breed[] = [];
  autoCompleteList: any[];
  private subscriptions: Subscription[] = [];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() selectedOption = new EventEmitter();

  constructor(
      public searchService: SearchService
  ) { }

  ngOnInit(): void {

      // get all the breeds
      this.breeds = JSON.parse(localStorage.getItem('breeds'));

      // when user types something in input, the value changes will come through this
      this.subscriptions.push(
        this.myControl.valueChanges.subscribe((userInput: string) => {
          this.autoCompleteExpenseList(userInput);
        })
      );
  }

  private autoCompleteExpenseList(input: string): void {
      const categoryList = this.filterCategoryList(input);
      this.autoCompleteList = [...categoryList];
  }

  // this is where filtering the data happens according to you typed value
  filterCategoryList(val: string): Breed[] {
      const categoryList = [];
      if (typeof val !== 'string') {
          return [];
      }
      if (val === '' || val === null) {
          return [];
      }
      return val ? this.breeds.filter(breed => breed.name.toLowerCase().indexOf(val.toLowerCase()) !== -1)
          : this.breeds;
  }

  // after you clicked an autosuggest option, this function will show the field you want to show in input
  displayFn(breed: Breed): any {
      return breed ? breed.name : breed;
  }

  filterBreedsList(event): void {
      const breed: Breed = event.source.value;
      if (!breed) {
          this.searchService.searchOptions = [];
      }
      else {
        if (this.searchService.searchOptions.indexOf(breed) < 0) {
            this.searchService.searchOptions.push(breed);
        }
        this.selectedOption.emit(this.searchService.searchOptions);
      }
      this.focusOnPlaceInput();
  }

  removeOption(option): void {
      const index = this.searchService.searchOptions.indexOf(option);
      if (index >= 0) {
          this.searchService.searchOptions.splice(index, 1);
      }
      this.focusOnPlaceInput();

      this.selectedOption.emit(this.searchService.searchOptions);
  }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput(): void {
      this.autocompleteInput.nativeElement.focus();
      this.autocompleteInput.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
