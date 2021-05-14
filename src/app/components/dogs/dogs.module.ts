import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DogsRoutingModule } from './dogs-routing.module';
import { DogCardComponent } from './dog/dogCard.component';
import { DogsCardsComponent } from './dogsCards.component';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator'; 

@NgModule({
  declarations: [
    DogCardComponent,
    DogsCardsComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    DogsRoutingModule,
    MatButtonModule,
    MatPaginatorModule
    
  ], exports: [
    DogsCardsComponent,
    DogsCardsComponent
  ]
})
export class DogsCardsModule { }
