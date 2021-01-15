import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fest-frontend';
  showNavbar: boolean = false;

  constructor(private authService: AuthService) {
    this.showNavbar = this.authService.checkToken()
  }

}
