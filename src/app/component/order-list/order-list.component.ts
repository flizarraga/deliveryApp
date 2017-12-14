import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
var moment = require('moment/moment');

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() type: string;
  orderList: any = [];

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    if (this.type == 'HISTORIAL') {
      this.getAll();
    } else {
      this.getAllToday();
    }
  }

  getAll() {
    this._orderService.getAll().then((response) => {
      this.orderList = this.transform(response);
    }, (error) => {

    });
  }

  getAllToday() {
    this._orderService.getAllToday(moment().format("YYYY-MM-DD").toString()).then((response) => {
      this.orderList = this.transform(response);
    }, (error) => {

    });
  }

  transform(response: any) {
    response.forEach((item: any) => {
      var foodMap: {[key: string]: any} = {};

      item.foods.forEach((food: any) => {
        if (foodMap[food.id] != null) {
          foodMap[food.id].price = foodMap[food.id].price + food.price;
          foodMap[food.id]["count"]++
        } else {
          foodMap[food.id] = food;
          foodMap[food.id]["count"] = 1;
        }
      });

      var foodList: any[] = [];
      var totalPrice: number = 0;
      Object.keys(foodMap).forEach((key) => {
        foodList.push(foodMap[key]);
        totalPrice = totalPrice + foodMap[key].price;
      });
      item.foods = foodList;
      item["totalPrice"] = totalPrice;
      item["showDetail"] = false;
    });

    return response;
  }

}
