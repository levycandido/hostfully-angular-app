import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtService2} from "../../service/jwt-service2.service";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";
import {NotificationService} from "../../../services/NotificationService";

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
    private router: Router,
    private notificationService: NotificationService
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
        }
      }),
      catchError(error => {
        if (error.status === 403) {
          this.notificationService.showError('Access Denied: Invalid credentials', error);
        } else {
          this.notificationService.showError("An unexpected error occurred");
        }
        return of(null);
      })
    ).subscribe(value => this.router.navigateByUrl("/"));
  }
}
