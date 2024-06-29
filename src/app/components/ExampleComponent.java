import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-example',
  template: `
  <button mat-raised-button color="primary" (click)="showSuccess()">Show Success</button>
  <button mat-raised-button color="warn" (click)="showError()">Show Error</button>
  `
})
export class ExampleComponent {

  constructor(private notificationService: NotificationService) { }

  showSuccess() {
    this.notificationService.showSuccess('Operation Successful!');
  }

  showError() {
    this.notificationService.showError('Operation Failed!');
  }
}
