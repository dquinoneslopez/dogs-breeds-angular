import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DogsCardsComponent } from './dogsCards.component';

const routes: Routes = [
  {
    path: '',
    component: DogsCardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogsRoutingModule { }
