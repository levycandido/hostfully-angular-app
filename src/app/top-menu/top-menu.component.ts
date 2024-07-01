import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Certifique-se de ajustar o caminho do import

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;
  isAdmin: boolean = true;
  showCadastroMenu: boolean = false;
  private userRole: string = 'admin';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem("userName");
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  toggleCadastroMenu(): void {
    this.showCadastroMenu = !this.showCadastroMenu;
  }
}
