import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserAccessResolverService} from "../../service/user-access-resolver.service";

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
  userForm: FormGroup;
  locations = ['Wilde', 'Lanus', 'Lomas de zamora', 'Temperley', 'Avellaneda'];
  showValidation: boolean = false;
  submitted: boolean = false;
  userExitError: boolean = false;

  constructor(private _userService: UserService, private _userAccessResolver: UserAccessResolverService) {
    this.userForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
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
        'userType': this.user.type
      });
    }
  }

  getSelectedIndex(location: string, index: number) {
    return location.split(",")[index];
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

  cancel() {
    this.cancelEvent.emit(true);
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
