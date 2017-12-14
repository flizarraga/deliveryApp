import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() type: string;
  orderList: any = [];
  message: string = "Cargando...";

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
      if (this.orderList.length > 0) {
        this.message = null;
      } else {
        this.message = "Todavía no se ingresaron pedidos";
      }
    }, (error) => {
      this.message = "Error - hubo un fallo en la base de datos, intente más tarde";
    });
  }

  getAllToday() {
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

    this._orderService.getAllToday(newToday).then((response) => {
      this.orderList = this.transform(response);
      if (this.orderList.length > 0) {
        this.message = null;
      } else {
        this.message = "Todavía no se ingresaron pedidos";
      }
    }, (error) => {
      this.message = error.error.statusCode + " - " + error.error.message;
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
