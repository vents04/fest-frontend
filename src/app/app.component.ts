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
  showDropdown: boolean = false;
  selectedComponent: string = "dashboard";

  isMobile: boolean = false;
  isDesktop: boolean = false;

  username: string = "";
  email: string = "";

  ngOnInit(): void {
    this.setDeviceType();
    // get profile details and update username and email //
    this.username = "username";
    this.email = "email@email.com";
  }

  constructor(private authService: AuthService, private router: Router) {
    this.showNavbar = this.authService.checkToken()
  }

  openComponent(component: string) {
    this.router.navigate([`/${component}`]);
    this.selectedComponent = component;
  }

  setDeviceType() {
    if(screen.width < 768) this.isMobile = true;
    else this.isDesktop = true;
  }

  openProfileModal() {
    let modalProfile = document.querySelector("#profile-modal") as HTMLElement;
    modalProfile.classList.add("is-active");
  }

  saveProfileChanges(email: string, username: string) {
    // Request to backend //
  }

  closeProfileModal() {
    let modalProfile = document.querySelector("#profile-modal") as HTMLElement;
    modalProfile.classList.remove("is-active");
  }

}
