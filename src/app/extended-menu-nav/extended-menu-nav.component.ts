import { Component, Input } from '@angular/core';
import { MenuNavNode } from '../models/menu-nav-node.model';



@Component({
  selector: 'ga-extended-menu-nav',
  templateUrl: './extended-menu-nav.component.html',
})
export class ExtendedMenuNavComponent {
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
