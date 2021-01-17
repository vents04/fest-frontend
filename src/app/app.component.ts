import { HttpResponse } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';

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
    this.authService.checkToken().subscribe((res: HttpResponse<any>) => {
      const responseBody = JSON.parse(res.body);
      (res.status == 400) ? this.router.navigate(['/login']) : this.setProfileDetails(responseBody.username, responseBody.email);
    })
    this.setDeviceType();
  }

  setProfileDetails(username : string, email : string) {
    this.username = username;
    this.email = email;
  }

  constructor(private authService: AuthService, private router: Router) {
    /*
    this.authService.checkToken().subscribe((res: HttpResponse<any>) => {
      if(res.status === 200){
        this.showNavbar = true;
      }
    }); 
    */
   this.showNavbar = true;
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
