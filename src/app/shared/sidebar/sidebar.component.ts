import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private router: Router,
    private authService: AuthService) {

  }

  onLogout(): void {
    this.authService.logout()
      .then(() => this.router.navigate(['./inicio-sesion']))
      .catch(error => console.error(error))
  }
}
