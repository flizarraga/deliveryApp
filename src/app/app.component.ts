import { Component } from '@angular/core';
import {OrderService} from "./services/order.service";
import {ViewContentResolveService} from "./service/view-content-resolve.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  orderMap: any;

  constructor(private _orderService: OrderService, private _viewContentResolver: ViewContentResolveService) {
    this.orderMap = this._orderService.orderMap;
  }

  compareContentType(viewContent: string) {
    return this._viewContentResolver.compareViewContent(viewContent);
  }

  getViewContent() {
    return this._viewContentResolver.getViewContent();
  }
}
