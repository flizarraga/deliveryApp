import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order-state',
  templateUrl: './order-state.component.html',
  styleUrls: ['./order-state.component.scss']
})
export class OrderStateComponent implements OnInit {

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
  }

  compareState(state: string) {
    if (this._orderService.state == 'ENTREGA') {
      return true;
    } else if (this._orderService.state == 'CONFIRMACION' && state != 'ENTREGA') {
      return true;
    } else {
      return state == this._orderService.state;
    }
  }
}
