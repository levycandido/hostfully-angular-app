import {Customer} from "./Customer";


export interface Person {
  id?: number;
  name: string;
  type: String;
  customer: Customer; // Adicione o campo customer

}

export interface Guest extends Person {
  // Additional properties for Guest
}

export interface Employee extends Person {
  role: string;
}
