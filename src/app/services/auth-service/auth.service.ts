import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  readonly ROOT_URL;

  constructor(private http: HttpClient, private router: Router) {
    this.ROOT_URL = "http://localhost:8080";
  } 

  getAuthToken(){
    return localStorage.getItem('Authorization');
  }

  checkToken(){
    return this.http.get(`${this.ROOT_URL}/users`, { observe: 'response', responseType: 'text' });
  }

  setAuthToken(authToken: string){
    localStorage.setItem('Authorization', authToken);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/user/login`, { email, password }, { observe: 'response', responseType: 'text' }).pipe(
      shareReplay(), tap((res: HttpResponse<any>) => {
        try{
          let token = JSON.parse(res.body).access_token;
          token != null ? this.setToken(token) : console.log("log in failed.");
        }catch(err){
          // error modal //
        }
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/user`, { name, email, password }, { observe: 'response', responseType: 'text' }).pipe(
      shareReplay(), tap((res: HttpResponse<any>) => {
        try{
          let token = JSON.parse(res.body).access_token;
          token != null ? this.setToken(token) : console.log("log in failed.");
        }catch(err){
          // error modal //
        }
      })
    );
  }

  logout(){
    this.removeToken();
    this.router.navigateByUrl('/login');
  }

  private setToken(authToken: string){
    localStorage.setItem("Authorization", authToken);
  }

  private removeToken(){
    localStorage.removeItem("Authorization");
  }
}
