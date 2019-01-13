import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  registrationUrl = environment.serviceUrl + "/api/user-register";
  userDataUrl = environment.serviceUrl + "/api/user-details";
  userDeleteUrl = environment.serviceUrl + "/api/user-delete";

  constructor(
    private http: HttpClient
  ) { }

  getAuthorizationHeader() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return headers;
  }

  registration(form) {
    return this.http.post(this.registrationUrl, form, { headers: this.getAuthorizationHeader() });
  }

  deleteUser(userid) {
    let data = {
      id: userid
    }
    return this.http.post(this.userDeleteUrl, data, { headers: this.getAuthorizationHeader() });
  }
}
