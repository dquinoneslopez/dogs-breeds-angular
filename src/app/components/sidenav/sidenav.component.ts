import { Component, Input, OnInit, OnDestroy, ViewChildren, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Breed } from 'src/app/interfaces/breed';
import { MatListOption } from '@angular/material/list';
import { SelectionService } from '../../services/selection.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(MatListOption) listOptions: MatListOption[];

  public breeds: Breed[];

  private selectedBreeds: Breed[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService,
    private selectionService: SelectionService,
  ) { }

  ngOnInit(): void {
    this.breeds = JSON.parse(localStorage.getItem('breeds'));
    this.selectedBreeds = JSON.parse(localStorage.getItem('sidenav-selection'));
    if (!this.breeds) {
      this.subscriptions.push(this.dataService.getBreeds().subscribe(breeds => {
        this.breeds = [...breeds];
      }));
    }
  }

  ngAfterViewInit(): void {
    this.listOptions.forEach(option => {
      if (this.selectedBreeds.filter(breed => breed.name === option.value.name).length > 0) {
        option.selected = true;
      }
    });
    this.selectionService.setSelection(this.selectedBreeds);
  }

  onSelectionChange(options: MatListOption[]): void {
    this.selectedBreeds = [...options.map(o => o.value)];
    this.selectionService.setSelection(this.selectedBreeds);
    localStorage.setItem('sidenav-selection', JSON.stringify(this.selectedBreeds));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
