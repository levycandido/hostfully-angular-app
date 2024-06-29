import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService2 } from "../../service/jwt-service2.service";
import { Router } from "@angular/router";
import { Person } from "../../../models/Person";
import { Customer } from "../../../models/Customer";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | undefined;

  constructor(
    private service: JwtService2,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({passwordMismatch: true});
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    const person: Person = this.createPerson();
    this.service.addPerson(person).subscribe(
      (response) => {
        if (response.id != null) {
          localStorage.setItem('email', response.customer.email);
          this.router.navigateByUrl("/login");
        }
      }
    );
  }


  private createPerson(): Person {
    return {
      customer: this.createCustomer(),
      name: this.registerForm?.get('name')?.value,
      type: 'guest'
    } as Person;
  }

  private createCustomer(): Customer {
    return {
      email: this.registerForm?.get('email')?.value,
      password: this.registerForm?.get('password')?.value
    } as Customer;

  }
}
