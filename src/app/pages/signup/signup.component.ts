import { HttpResponse } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  // Those are the parameters that we are going to pass to the backend
  name: string = "";
  email: string = "";
  password: string = "";

  presentError: boolean = false;

  ngOnInit(): void {  }

  showLoadingAnimation(){
    var modal = document.querySelector("#loadingModal");
    var submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = true;
    if(modal) modal.classList.add("is-active");
  }

  closeModals(){
    var modals = document.getElementsByClassName("modal");
    for(let index = 0; index <modals.length; index++){
      if(modals[index].classList.contains("is-active")) modals[index].classList.remove("is-active");
    }
    var submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = false;
  }

  hideAllErrors(){
    this.hideError("nameError");
    this.hideError("emailError");
    this.hideError("firstPasswordError");
    this.hideError("secondPasswordError");

    this.presentError = false;
  }
  
  hideError(id: string){
    var selectError = document.getElementById(id) as HTMLElement;
    selectError.style.display = "none"; 
  }

  showError(id: string, message: string){
    // Show error if the user gave us invalid data
    var selectError = document.getElementById(id) as HTMLElement;
    selectError.innerHTML = message;
    selectError.style.display = "block"; 
    selectError.scrollIntoView();

    this.presentError = true;
  }

  onSignupButtonClicked(){
    // Check for invalid data
    let nameEl = document.getElementById("name") as HTMLInputElement;
    let emailEl = document.getElementById("email") as HTMLInputElement;
    let firstPasswordEl = document.getElementById("firstPassword") as HTMLInputElement;
    let secondPasswordEl = document.getElementById("secondPassword") as HTMLInputElement;

    if(nameEl.value == "") this.showError("nameError", "This field is empty");
    if(emailEl.value == "") this.showError("emailError", "This field is empty");
    if(firstPasswordEl.value == "") this.showError("firstPassword", "This field is empty");
    if(secondPasswordEl.value == "") this.showError("secondPassword", "This field is empty");
    if(firstPasswordEl.value == secondPasswordEl.value) this.showError("firstPassowrd", "The passwords don't match");

    if(!this.presentError){
      this.name = nameEl.value;
      this.email = emailEl.value;
      this.password = firstPasswordEl.value;

      this.showLoadingAnimation();
      this.authService.signup(this.name, this.email, this.password).pipe(
        catchError((err: any) => {
          // Load error modal
          this.closeModals();
          if(err.status == 400){
            var modal = document.querySelector("#errorModal");
            var modalTitle = document.querySelector("#errorModalTitle");
            var modalDescription = document.querySelector("#errorModalDescription");
            if(modalTitle) modalTitle.innerHTML = "Bad request"
            if(modalDescription) modalDescription.innerHTML = err.error;
            if(modal) modal.classList.add("is-active");
          }
          return Observable.throw(err);
        })
      ).subscribe((res: HttpResponse<any>) => {
        // Load success modal
        this.closeModals();
        if(res.body != ""){
          var modal = document.getElementById("successModal") as HTMLDivElement;
          modal.classList.add("is-active");
          setTimeout(() => {
            // Redirect dashboard
            this.router.navigate(['/dashboard']);
          }, 6000)
        }
      })
    }
  }
}
