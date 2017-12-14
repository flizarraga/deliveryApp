import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { MenuComponent } from './component/menu/menu.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomeComponent } from './component/home/home.component';
import { OrderComponent } from './component/order/order.component';
import { FoodService } from "./services/food.service";
import { OrderService } from "./services/order.service";
import { UserService } from "./services/user.service";
import { OrderStateComponent } from './component/order-state/order-state.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { OrdenDetailComponent } from './component/orden-detail/orden-detail.component';
import { OrdenButtonsComponent } from './component/orden-buttons/orden-buttons.component';
import { LoginComponent } from './component/login/login.component';
import { UserListComponent } from './component/user-list/user-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ViewContentResolveService} from "./service/view-content-resolve.service";
import {UserAccessResolverService} from "./service/user-access-resolver.service";
import { OrderListComponent } from './component/order-list/order-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    ContactComponent,
    HomeComponent,
    OrderComponent,
    OrderStateComponent,
    UserFormComponent,
    OrdenDetailComponent,
    OrdenButtonsComponent,
    LoginComponent,
    UserListComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [FoodService, OrderService, UserService, ViewContentResolveService, UserAccessResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
