import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {ViewContentResolveService} from "../../service/view-content-resolve.service";
import {UserAccessResolverService} from "../../service/user-access-resolver.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  showTooltip: boolean = false;

  constructor(private _viewContentResolver: ViewContentResolveService, private _userAccesResolver: UserAccessResolverService) { }

  ngOnInit() {
  }

  changeContent(viewContent: string) {
    this._viewContentResolver.changeViewContent(viewContent);
  }

  hasUserAcces(sector) {
    return this._userAccesResolver.hasUserAccess(sector);
  }
}
