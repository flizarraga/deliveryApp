import {Component, Input, OnInit} from '@angular/core';
import {FoodService} from "../../services/food.service";
import {OrderService} from "../../services/order.service";
import {FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {UserAccessResolverService} from "../../service/user-access-resolver.service";
import {isNumber} from "util";
import {ViewContentResolveService} from "../../service/view-content-resolve.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() viewMode: string;

  foodForms: any = {};
  foodsGroup: any;
  showValidation: any = {};
  showUpdateButton: boolean = false;
  foodChange: any;
  showDetail: any = {};
  message: string = "Cargando...";

  constructor(private _foodService: FoodService, private _orderService: OrderService, private _userAccessResolver: UserAccessResolverService
              , private _viewContentResolve: ViewContentResolveService) {}

  ngOnInit() {
    this._foodService.getAll().then((result) => {
      this.foodsGroup = result;
      if (this.foodsGroup.length > 0) {
        this.message = null;
      } else {
        this.message = "No hay comidas cargadas!";
      }
      this.foodsGroup.forEach((group: any) => {
        this.foodForms[group.foodType] = new FormGroup({
          'name': new FormControl('', Validators.required),
          'description': new FormControl('', Validators.required),
          'price': new FormControl('', Validators.required),
          'foodType': new FormControl(group.foodType, Validators.required)
        },
          DecimalValidation.MatchDecimal
        );
      }, (error) => {
        this.message = "Error - hubo problemas con la base de datos, intente nuevamente más tarde";
      });
    });
  }

  compareViewContent(viewContent: string) {
    return this._viewContentResolve.compareViewContent(viewContent);
  }

  refresh() {
    this._foodService.getAll().then((result)=> {
      this.foodsGroup = result;
      if (this.foodsGroup.length > 0) {
        this.message = null;
      } else {
        this.message = "No hay comidas cargadas!";
      }
    }, (error) => {
      this.message = "Error - hubo problemas con la base de datos, intente nuevamente más tarde";
    });
  }

  execute(action: string, food: any) {
    this._foodService.execute(action, food).then(() => {
      this.refresh();
    });
  }

  hasUserAcces(sector: string) {
    return this._userAccessResolver.hasUserAccess(sector);
  }

  runAction(action, food) {
    this._orderService.runAction(action, food);
  }

  edit(food: any, foodType: any) {
    this.foodChange = food;
    this.showUpdateButton = true;

    this.foodForms[foodType].reset({
      "name": food.name,
      "description": food.description,
      "price": food.price,
      "foodType": food.foodType
    });
  }

  saveChanges(foodType: any) {
    this.showValidation[foodType] = true;
    if (this.foodForms[foodType].status == 'VALID') {
      this.showUpdateButton = false;
      var food = this.foodForms[foodType].value;
      food["id"] = this.foodChange.id;
      this.execute("UPDATE", food);
    }
  }

  onSubmit(foodType: any) {
    this.showValidation[foodType] = true;
    if (this.foodForms[foodType].status == 'VALID') {
      this.showValidation[foodType] = false;
      this.execute("ADD", this.foodForms[foodType].value);
      this.foodForms[foodType].reset({
        "foodType": foodType
      });
    }
  }
}

export class DecimalValidation {

  static MatchDecimal(AC: AbstractControl) {
    if (AC.get('price').value == null) {
      return null;
    }
    var price = AC.get('price').value.toString();
    var split = price.split(".");
    if (split.length > 2) {
      split.forEach((item) => {
        if (!isNumber(item)) {
          AC.get('price').setErrors({matchDecimal: true});
        }
      });
      AC.get('price').setErrors({matchDecimal: true});
    } else {
      return null;
    }
  }
}
