import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ViewContentResolveService} from "../../service/view-content-resolve.service";
import {JwtHelper} from "angular2-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() viewMode;
  loginForm: FormGroup;
  showValidation: boolean = false;
  errorMesssage;
  jwtHelper: any;
  userName: string;
  userLoged: boolean = false;
  showTooltip: boolean = false;

  constructor(fb: FormBuilder, private _userService: UserService, private _viewContentResolver: ViewContentResolveService) {
    this.jwtHelper = new JwtHelper();
    this.loginForm = fb.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.required],
    });

    var token = localStorage.getItem("deliveryToken");
    if (token != null) {
      this.userName = this.decodeToken(token).userName;
      this.userLoged = true;
    }
  }

  ngOnInit() {
  }

  changeContent(viewContent) {
    this._viewContentResolver.changeViewContent(viewContent);
  }

  ingresar() {
    if (this.loginForm.status == 'VALID') {
      this._userService.login(this.loginForm.value.userName, this.loginForm.value.password).then((result) => {
        localStorage.setItem("deliveryToken", result.deliveryToken);
        this.userName = this.decodeToken(result.deliveryToken).userName;
        this.userLoged = true;

      }, (error) => {
        this.errorMesssage = error.error.message;
      });
    }
  }

  editarPerfil() {
    this._viewContentResolver.changeViewContent('EDITAR_PERFIL')
  }

  salir() {
    localStorage.removeItem("deliveryToken");
    this.userLoged = false;
  }

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

}
