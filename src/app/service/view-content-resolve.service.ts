import { Injectable } from '@angular/core';
import {OrderService} from "../services/order.service";

@Injectable()
export class ViewContentResolveService {
  private viewContentType: string = "INICIO";

  constructor(private _orderService: OrderService) {

  }

  changeViewContent(viewContent) {
    if (viewContent == 'PEDIDO' && this._orderService.state == 'ENTREGA') {
      this._orderService.orderMap = {};
      this._orderService.state = 'ORDEN';
    }

    this.viewContentType = viewContent;
  }

  compareViewContent(viewContent) {
    return this.viewContentType == viewContent;
  }

  getViewContent() {
    return this.viewContentType;
  }

}
