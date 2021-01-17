import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:8080";
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`, { observe: 'response', responseType: 'text' });
  }

  post(url: string, payload: object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }

  patch(url: string, payload: object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }

  getMonitoredWebsites(sortRequest: string) {
    return this.http.get(`${this.ROOT_URL}/monitoredWebsites/read`, { observe: 'response', responseType: 'text'});
  }

}
