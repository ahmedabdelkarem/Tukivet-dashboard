import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuNavNode } from '../models/menu-nav-node.model';


@Component({
  selector: 'ga-menu-nav',
  templateUrl: './menu-nav.component.html',
})
export class MenuNavComponent {
  menuOpened = false;
  @Input() currentPage?: string | null;
  @Input() menuNodes?: Array<MenuNavNode> | undefined;

  onOpenMenuNav(): void {
    this.menuOpened = !this.menuOpened;
  }

  onCloseMenuNav(): void {
    this.menuOpened = false;
  }
}
