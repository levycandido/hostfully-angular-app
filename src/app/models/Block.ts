import {Place} from "./Place";

export interface Block {
  id?: number;
  startDate: string;
  endDate: string;
  place: Place;
}
