import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class OrderService {
  public orderMap: any = {};
  public state: string = "ORDEN";
  public headers: HttpHeaders;

  constructor(private _http: HttpClient) { }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      var url = "https://deliveryya.000webhostapp.com/orders";

      this._http.get(url, {headers: this.headers})
        .subscribe((response) => {
          resolve(response);
        }, (error) => {

        })
      });
  };

  getAllToday(date: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var url = "https://deliveryya.000webhostapp.com/orders/" + date;

      this._http.get(url, {headers: this.headers})
        .subscribe((response) => {
          resolve(response);
        }, (error) => {

        })
    });
  };

  execute(action: string, code: string, orders: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      var url = "https://deliveryya.000webhostapp.com/orders";
      var data: string = JSON.stringify({action: action.toLowerCase(), code: code, orders: orders});
      this._http.post(url, data,{headers: this.headers})
        .subscribe((response) => {
          resolve(response);
        }, (error) => reject(error));

    });
  }

  runAction(action, food) {
    var id = food.id;

    if (action == 'MINUS') {
      if (this.orderMap[id] != null) {
        var count = this.orderMap[id].count;
        if (count == 1) {
          delete this.orderMap[id];
        } else {
          this.orderMap[id].count--;
        }
      }
    } else {
      if (this.orderMap[id] != null) {
        this.orderMap[id].count++;
      } else {
        this.orderMap[id] = {food: food, count: 1};
      }
    }
  }
}
