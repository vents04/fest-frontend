import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkToken() : boolean {
    const token = localStorage.getItem('x-auth-token');
    if(token == null || token == undefined || token == "") return false; 
    /* Making request to API here */
    return true;
  }
}
