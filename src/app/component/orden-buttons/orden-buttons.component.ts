import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-orden-buttons',
  templateUrl: './orden-buttons.component.html',
  styleUrls: ['./orden-buttons.component.scss']
})
export class OrdenButtonsComponent implements OnInit {
  @Input() state: any;
  @Output() clearEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
  }

  clear() {
    this.clearEvent.emit(true);
  }

  isEnabledClear() {
    if (this.state == 'ORDEN') {
      return Object.keys(this._orderService.orderMap).length > 0;
    } else if (this.state == 'CONFIRMACION') {

    }
  }

  isEnabledNext() {
    if (this.state == 'ORDEN') {
      return Object.keys(this._orderService.orderMap).length > 0;
    } else if (this.state == 'CONFIRMACION') {
      return true;
    }
  }

  next() {
    if (this.state == 'ORDEN') {
      this._orderService.state = "CONFIRMACION";
    } else if (this.state == 'CONFIRMACION') {
      this._orderService.state = "ENTREGA";
    }
  }

  prev() {
    if (this.state == "CONFIRMACION") {
      this._orderService.state = "ORDEN";
    } else if (this.state == "ENTREGA") {
      this._orderService.state = "CONFIRMACION";
    }
  }
}
