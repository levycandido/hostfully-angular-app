import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {JwtService2} from "../../service/jwt-service2.service";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;

  constructor(
    private service: JwtService2,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.service.login(this.loginForm.value).pipe(
      tap(response => {
        if (response.jwt) {
          localStorage.setItem('email', this.loginForm.get("email").value);
          localStorage.setItem('userId', this.loginForm.get("email").value);
          this.router.navigateByUrl("/");
        }
      }),
      catchError(error => {
        if (error.status === 403) {
          alert("Access Denied: Invalid credentials");
        } else {
          alert("An unexpected error occurred");
        }
        return of(null);
      })
    ).subscribe();
  }}
