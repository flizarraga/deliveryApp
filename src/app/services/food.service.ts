import {Inject, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class FoodService {
  static BASE_URL = "https://deliveryya.000webhostapp.com";
  public headers: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Access-Control-Allow-Origin", "https://deliveryya.000webhostapp.com");
    this.headers.append("Access-Control-Allow-Credentials", "false");
  }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      var url  = FoodService.BASE_URL +"/foods/";

      this._http.get(url, {headers: this.headers})
        .subscribe(
          (response: any) => resolve(response)
          , (error) => reject(error)
        );
    })
  }

  execute(action: string, food: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var url = FoodService.BASE_URL + "/foods";
      var data: string = JSON.stringify({action: action.toLowerCase(), food: food});

      this._http.post(url, data, {headers: this.headers})
        .subscribe(
          response => resolve(true)
          , error => reject()
        );
    });
  }


  mock() {
    var comidas: any = {};

    var a: any[] = [];
    a.push({id: 1, name: "Pizza", description: "Descripciondescripciondescripciondescripcion", price: 100, preparationTime: 10});
    a.push({id: 2, name: "Empanada de carne", description: "descripciondescripciondescripcion", price: 100, preparationTime: 10});
    a.push({id: 3, name: "Empanada de pollo", description: "descripciondescripciondescripcion", price: 100, preparationTime: 10});
    a.push({id: 4, name: "Empanada de pescado", description: "descripciondescripciondescripcion", price: 100, preparationTime: 10});
    a.push({id: 5, name: "Empanada de atun", description: "descripciondescripciondescripcion", price: 100, preparationTime: 10});
    a.push({id: 6, name: "Empanada de jamon y queso", description: "descripciondescripciondescripcion", price: 100, preparationTime: 10});
    a.push({id: 7, name: "Empanada de verdura ", description: "descripciondescripciondescripcion", price: 100, preparationTime: 10});

    var b: any[] = [];
    b.push({id: 8, name: "Asado", description: "Descripciondescripciondescripcion", price: 100, preparationTime: 10});
    b.push({id: 9, name: "Vacio", description: "Descripciondescripciondescripcion", price: 100, preparationTime: 10});

    comidas["Minutas"] = a;
    comidas["Carnes"] = b;

    return comidas;
  }

}
