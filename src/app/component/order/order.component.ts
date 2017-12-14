import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {JwtHelper} from "angular2-jwt";
import {ViewContentResolveService} from "../../service/view-content-resolve.service";

@Component({
  selector: 'app-pedido',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  state: string;
  user: any;

  constructor(private _orderService: OrderService, private _viewContentResolver: ViewContentResolveService) {

  }

  ngOnInit() {
    this.state = this._orderService.state;
  }

  compareState(state: string) {
    if (this._orderService.state == 'ENTREGA') {
      this._orderService
    }
    return state == this._orderService.state;
  }

  getUser() {
    var token = localStorage.getItem("deliveryToken");
    if (token != null) {
      var jwt = new JwtHelper();
      this.user = jwt.decodeToken(token);
      return this.user;
    }
  }

  confirm($event) {
    var user = $event.value;
    var keys = Object.keys(this._orderService.orderMap);
    var orders: any[] = [];
    var jwt = new JwtHelper();
    var userId = jwt.decodeToken(localStorage.getItem("deliveryToken")).id;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var anio = today.getFullYear();
    var dia;
    var mes;
    if(dd<10){
      dia='0'+dd;
    } else {
      dia = dd.toString();
    }
    if(mm<10){
      mes='0'+mm;
    } else {
      mes = mm.toString();
    }
    var newToday = anio+"-"+mes+"-"+dia;

    var date = newToday;
    var code = userId+user.userName+"&"+date.replace("-", "")+today.getHours()+today.getMinutes()+today.getSeconds();

    keys.forEach((key: any) => {
      var food = this._orderService.orderMap[key];
      for(var i = 0; i < food.count; i++) {
        orders.push({
          code: code, userId: userId, foodId: food.food.id, price: food.food.price / food.count, orderDate: newToday
        });
      }
    });

    this._orderService.execute("ADD", code, orders).then(
      (response) => {
          this._orderService.orderMap = {};
          this._orderService.state = "ENTREGA";
        },
          (error) => console.log(error)
    );
  }

  cancel() {
    this._orderService.orderMap = {};
    this._viewContentResolver.changeViewContent("INICIO");
  }

  isUserLoged() {
    return localStorage.getItem("deliveryToken") != null;
  }
}
