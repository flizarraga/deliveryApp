import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-orden-detail',
  templateUrl: './orden-detail.component.html',
  styleUrls: ['./orden-detail.component.scss']
})
export class OrdenDetailComponent implements OnInit {
  @Input() state;
  orderMap: any;

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.orderMap = this._orderService.orderMap;
  }

  getKeys() {
    return Object.keys(this.orderMap);
  }

  clear() {
    if (this.state == 'ORDEN') {
      this.orderMap = {};
      this._orderService.orderMap = {};
    }
  }

  getPrice(order: any) {
    return order.count * order.food.price;
  }

  getTotalPrice() {
    var totalPrice: number = 0;
    this.getKeys().forEach((key) => {
      totalPrice = totalPrice + this.getPrice(this.orderMap[key]);
    });

    return totalPrice;
  }

  changeState(state: string) {
    this._orderService.state = state;
  }

}
