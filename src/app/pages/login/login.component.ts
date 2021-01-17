import { Component, Input, OnInit, Output } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebRequestsService } from 'src/app/services/web-requests-service/web-requests.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private webService: WebRequestsService, private router: Router) { }
  
  loggedIn: boolean = false;

  username: string = "";
  password: string = "";

  ngOnInit(): void {
  }

  sendLogRequest(username: string, password: string): void {
    this.username = username;
    this.password = password;
    this.disableSubmit();
    this.authService.login(this.username, this.password).pipe(
      catchError((err: any) => {
        if(err.status == 400){
          this.enableSubmit();
          console.log(err.error);
        }
        return Observable.throw(err);
      })
    ).subscribe((res: HttpResponse<any>) => {
      if(res.status == 200){
        this.router.navigate(['/dashboard'])
      }
    })
  }

  disableSubmit() {
    var submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = true;
  }

  enableSubmit() {
    var submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = false;
  }

}
