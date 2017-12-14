import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ViewContentResolveService} from "../../service/view-content-resolve.service";
import {UserAccessResolverService} from "../../service/user-access-resolver.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  userUpdate: any;
  showTable: boolean = true;
  newUser: boolean = true;
  olderUser: boolean = true;
  message: string = "Cargando...";

  constructor(private _userService: UserService, private _userAccessResolver: UserAccessResolverService) { }

  ngOnInit() {
    this.refresh();
  }

  execute(action: string, user: any) {
    this._userService.execute(action, user).then(() => {
      this.showTable = true;
      this.refresh();
    });
  }

  changeUser(user) {
    this.showTable = false;
    this.userUpdate = user;
    this.olderUser = true;
    this.newUser = false;
  }

  addUser() {
    this.showTable = false;
    this.newUser = true;
    this.olderUser = false;
  }

  hasUserAccess(sector: string) {
    return this._userAccessResolver.hasUserAccess(sector);
  }

  cancel() {
    this.showTable = true;
  }

  refresh() {
    this._userService.getAll().then((result) => {
      this.users = result;
      if (this.users.length > 0) {
        this.message = null;
      } else {
        this.message = "No hay usuarios!";
      }
    }, (error) => {
      this.message = "Error - hubo un fallo en la base de datos, intente más tarde";
    });
  }

}
