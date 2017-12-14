import { Injectable } from '@angular/core';
import {Headers} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService {
  static BASE_URL = "https://deliveryya.000webhostapp.com";
  public user: any;
  public headers: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append("Content-Type", "application/json");
  }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      var url  = UserService.BASE_URL +"/users/";

      this._http.get(url, {headers: this.headers})
        .subscribe(
          (response: any) => resolve(response)
          , (error) => reject(error)
        );
    })
  }


  login(userName: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var url  = UserService.BASE_URL + "/login";

      var data: string = JSON.stringify({userName: userName, password: password});

      this._http.post(url, data,{headers: this.headers})
        .subscribe(
          response => resolve(response)
          , error => reject(error)
        );
    })
  }

  getByName(userName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var url  = UserService.BASE_URL + "/user-by-username/" + userName;

      this._http.get(url, {headers: this.headers})
        .subscribe(
          response => resolve(response)
          , error => reject()
        );
    })
  }

  getById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      var url = UserService.BASE_URL + "/user-by-id/" + id;

      this._http.get(url, {headers: this.headers})
        .subscribe(
          response => resolve(response)
          , error => reject()
        );
    })

  }

  execute(action: string, user: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var url = UserService.BASE_URL + "/user";
      var data: string = JSON.stringify({action: action.toLowerCase(), user: user});

      this._http.post(url, data, {headers: this.headers})
        .subscribe(
          response => resolve(true)
          , error => reject(error)
        );
    });
  }

  mock() {
    var users: any[] = [];
    users.push({id: 1, name: "Fede", lastName: "Lizarraga", location: "Los recuerdos 4001, Temperley", userName: "fefe", email: "fefe@gmail.com", userType: "M", phoneNumber: 11111});
    users.push({id: 2, name: "Fede", lastName: "Lizarraga", location: "Los recuerdos 4001, Temperley", userName: "fefe", email: "fefe@gmail.com", userType: "C", phoneNumber: 11111});
    users.push({id: 3, name: "Fede", lastName: "Lizarraga", location: "Los recuerdos 4001, Temperley", userName: "fefe", email: "fefe@gmail.com", userType: "C", phoneNumber: 11111});
    users.push({id: 4, name: "Fede", lastName: "Lizarraga", location: "Los recuerdos 4001, Temperley", userName: "fefe", email: "fefe@gmail.com", userType: "C", phoneNumber: 11111});
    users.push({id: 5, name: "Fede", lastName: "Lizarraga", location: "Los recuerdos 4001, Temperley", userName: "fefe", email: "fefe@gmail.com", userType: "V", phoneNumber: 11111});
    users.push({id: 6, name: "Fede", lastName: "Lizarraga", location: "Los recuerdos 4001, Temperley", userName: "fefe", email: "fefe@gmail.com", userType: "V", phoneNumber: 11111});
    users.push({id: 7, name: "Fede", lastName: "Lizarraga", location: "Los recuerdos 4001, Temperley", userName: "fefe", email: "fefe@gmail.com", userType: "V", phoneNumber: 11111});
    return users;
  }
}
