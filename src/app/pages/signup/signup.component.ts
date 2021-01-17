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

  ngOnInit(): void {  }

  onSignupButtonClicked(username : string, email : string, password : string){
    this.disableSubmit();
    this.authService.signup(username, email, password).pipe(
      catchError((err: any) => {
        if(err.status == 400){
          this.enableSubmit();
          console.log("failed to signup");
        }  
        return Observable.throw(err);
      })
    ).subscribe((res: HttpResponse<any>) => {
      if(res.status == 200){
        this.router.navigate(['/dashboard']);
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
