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

  email: string = "";
  password: string = "";

  showLoadingAnimation(){
    var modal = document.querySelector("#loadingModal");
    var submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = true;
    if(modal!=null) modal.classList.add("is-active");
  }

  ngOnInit(): void {
    this.authService.checkToken().pipe(catchError((err: any) =>{
      return Observable.throw(err);
    })).subscribe((res: HttpResponse<any>)=>{
      if(res.body == "Logged"){
        //Logged
      }else{
        //Not logged
      }
    })
  }

  closeModals(){
    var modals = document.getElementsByClassName("modal");
    for(let index = 0; index <modals.length; index++){
      if(modals[index].classList.contains("is-active")) modals[index].classList.remove("is-active");
    }
    var submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = false;
  }

  sendLogRequest(): void {
    let emailElement = document.getElementById("email") as HTMLInputElement;
    let passwordElement = document.getElementById("password") as HTMLInputElement;
    this.email = emailElement.value;
    this.password = passwordElement.value;

    this.showLoadingAnimation();
    this.authService.login(this.email, this.password).pipe(
      catchError((err: any) => {
        // Check for errors
        this.closeModals();
        if(err.status == 400){
          console.log(err.error);
          if(err.error == "Email or password is wrong!"){
            var modal = document.querySelector("#errorModal");
            var modalTitle = document.querySelector("#errorModalTitle");
            if(modalTitle!=null) modalTitle.innerHTML = err.error;
            if(modal) modal.classList.add("is-active");
          }
        }
        return Observable.throw(err);
      })
    ).subscribe((res: HttpResponse<any>) => {
      if(res.body != ""){
        // Redirect to dashboard page
        this.router.navigate(['/dashboard'])
      }
    })
  }

}
