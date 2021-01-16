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
    return localStorage.getItem('x-auth-token');
  }

  checkToken(){
    return this.http.get(`${this.ROOT_URL}/user/read/check-token`, { observe: 'response', responseType: 'text' });
  }

  setAuthToken(authToken: string){
    localStorage.setItem('x-auth-token', authToken);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/user/create/login`, { email, password }, { observe: 'response', responseType: 'text' }).pipe(
      shareReplay(), tap((res: HttpResponse<any>) => {
        // Set token
        let token = res.headers.get('x-auth-token');
        this.setToken(token != null ? token : "NoTokenFound");
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/user/create/signup`, { name, email, password }, { observe: 'response', responseType: 'text' }).pipe(
      shareReplay(), tap((res: HttpResponse<any>) => {
        // Set token
        let token = res.headers.get('x-auth-token');
        this.setToken(token != null ? token : "NoTokenFound");
      })
    );
  }

  logout(){
    this.removeToken();
    this.router.navigateByUrl('/login');
  }

  private setToken(authToken: string){
    localStorage.setItem("x-auth-token", authToken);
  }

  private removeToken(){
    localStorage.removeItem("x-auth-token");
  }
}
