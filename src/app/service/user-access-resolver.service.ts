import { Injectable } from '@angular/core';
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class UserAccessResolverService {
  private static S_ACCES = ["LISTA_PEDIDOS", "LISTA_USUARIOS", "HISTORY", "FOOD_ACTIONS", "ADD_USERS"];
  private static V_ACCES = ["LISTA_PEDIDOS"];

  constructor() {
  }

  hasUserAccess(sector: string) {
    var token = localStorage.getItem("deliveryToken");
    if (token != null) {
      var jwt = new JwtHelper();
      var userType = jwt.decodeToken(token).userType;

      if (userType == 'S') {
        return UserAccessResolverService.S_ACCES.indexOf(sector) >= 0;
      } else if (userType == 'V') {
        return UserAccessResolverService.V_ACCES.indexOf(sector) >= 0;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
