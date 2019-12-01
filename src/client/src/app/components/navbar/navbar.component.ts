import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../entities/role';

@Component({
  selector: 'mma-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  isAdmin(): boolean {
    return this.authService.user.role.toString() == Role[2];
  }

  logout(): void {
    this.authService.logout();

  }

}
