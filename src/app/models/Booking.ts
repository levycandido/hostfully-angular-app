import {Person} from "./Person";
import {Place} from "./Place";

export interface Booking {
  id?: number;
  startDate: string;
  endDate: string;
  status: string;
  guest: Person;
  place: Place;
}
