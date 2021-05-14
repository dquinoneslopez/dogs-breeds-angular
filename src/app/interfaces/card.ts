import { Breed } from "./breed";

export interface Card {
    breed: Breed;
    images: string[];
    cols: number;
    rows: number;
  }