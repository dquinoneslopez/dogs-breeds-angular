import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/interfaces/breed';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  breeds: Breed[] = [];
  
  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.breeds = JSON.parse(localStorage.getItem('breeds'));
    this.searchService.breedsData = [...this.breeds];
  }

  onSelectedFilter(event): void {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList(): void {
    console.log(this.searchService.searchOptions)
    if (this.searchService.searchOptions.length > 0) {
      this.breeds = this.searchService.filteredListOptions();
    }
    else {
      this.breeds = [];
    }
  }

}
