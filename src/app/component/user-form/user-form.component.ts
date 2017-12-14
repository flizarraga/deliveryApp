import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserAccessResolverService} from "../../service/user-access-resolver.service";
import {JwtHelper} from "angular2-jwt";
import {ViewContentResolveService} from "../../service/view-content-resolve.service";

@Component({
  selector: 'app-user',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() viewMode;
  @Input() user;
  @Input() disabledButtons: boolean = false;
  @Output() confirmEvent: EventEmitter<FormGroup> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();
  showChangePassword: boolean = false;
  userForm: FormGroup;
  locations = ['Wilde', 'Lanus', 'Lomas de zamora', 'Temperley', 'Avellaneda'];
  showValidation: boolean = false;
  submitted: boolean = false;
  userExitError: boolean = false;

  constructor(private _userService: UserService, private _userAccessResolver: UserAccessResolverService, private _viewContentResolver: ViewContentResolveService) {
    this.userForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'actualPassword': new FormControl('', [Validators.required, Validators.maxLength(15)]),
      'password': new FormControl('', [Validators.required, Validators.maxLength(15)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.maxLength(15)]),
      'name': new FormControl('', [Validators.required, Validators.pattern('^\\D*$')]),
      'street': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(20)]),
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern('^\\d*$')]),
      'userType': new FormControl('C')
    }, PasswordValidation.MatchPassword);
  }

  ngOnInit() {
    if (this.viewMode == 'EDITAR_PERFIL') {
      var token = localStorage.getItem("deliveryToken");
      var jwt = new JwtHelper();
      this.user = jwt.decodeToken(token);
    }

    if (this.user != null) {
      this.userForm.reset({
        'userName': this.user.userName,
        'password': this.user.password,
        'confirmPassword':  this.user.password,
        'name': this.user.name,
        'street': this.getSelectedIndex(this.user.location, 0),
        'location': this.getSelectedIndex(this.user.location, 1),
        'email': this.user.email,
        'phoneNumber': this.user.phoneNumber,
        'userType': this.user.userType
      });
    }
  }

  getSelectedIndex(location: string, index: number) {
    return location.split(",")[index];
  }

  isSelected(location: string) {
    if(this.userForm.value.location != null || this.userForm.value.location != '') {
      return location == this.userForm.value.location;
    }
    return false;
  }

  isSelectedUserType(userType) {
    if(this.userForm.value.userType != null || this.userForm.value.userType != '') {
      return userType == this.userForm.value.userType;
    }
    return false;
  }

  onSubmit() {
    this.showValidation = true;
    if (this.userForm.status == 'VALID') {
      var location = this.userForm.value.street + "," + this.userForm.value.location;
      this.userForm.value.location = location;
      this._userService.execute("ADD", this.userForm.value).then((response) => {

      }, (error) => {
        if (error.error.statusCode == 'ERROR_USER_EXIST') {
          this.userExitError = true;
        }
      });
    }
    this.submitted = true;
  }

  hasUserAccess(sector: string) {
    return this._userAccessResolver.hasUserAccess(sector);
  }

  confirm() {
    this.showValidation = true;
    if (this.userForm.status == 'VALID') {
      var location = this.userForm.value.street + "," + this.userForm.value.location;
      this.userForm.value.location = location;
      this.confirmEvent.emit(this.userForm);
    }
  }

  saveChanges() {
    this.showValidation = true;

    if (this.showChangePassword) {
      if (this.userForm.status == 'VALID') {
        var location = this.userForm.value.street + "," + this.userForm.value.location;
        this.userForm.value.location = location;
        this._userService.execute("UPDATE", this.userForm.value).then((response) => {
          this._userService.login(this.userForm.value.userName, this.userForm.value.password).then((response) => {
            localStorage.setItem("deliveryToken", response.deliveryToken);
            this._viewContentResolver.changeViewContent("INICIO");
          });
        });
      }
    }
  }

  cancel() {
    if(this.viewMode == 'EDITAR_PERFIL') {
      this._viewContentResolver.changeViewContent("INICIO");
    } else {
      this.cancelEvent.emit(true);
    }
  }
}
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    var password = AC.get('password').value;
    var confirmPassword = AC.get('confirmPassword').value;
    if(password != confirmPassword) {
      AC.get('confirmPassword').setErrors({matchPassword: true});
    } else {
      return null;
    }
  }
}
