import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


import { from } from 'rxjs';
import { MenuNavNode } from 'src/app/models/menu-nav-node.model';



@Component({
  selector: 'ga-extended-menu-nav-sidebar',
  templateUrl: './extended-menu-nav-sidebar.component.html',
})
export class ExtendedMenuNavSidebarComponent {
  @Input() activeLink: MenuNavNode | undefined;
  @Input() menuNodes: Array<MenuNavNode> | undefined;
  @Input() menuOpened?: boolean;
  @Input() currentPage?: string | null;

  fixedMenuNodes = [
  ]

  itemHovered = false;

  constructor(private readonly router: Router) {

  }



  @Output() readonly closeMenu = new EventEmitter<undefined>();

  onToggleClick(node: MenuNavNode) {
    if (node.children.length) {
      node.expanded = !node.expanded;
    } else {
      this.onMenuNodeClick(node);
    }
  }

  onMenuNodeClick(node: MenuNavNode): void {
    from(this.router.navigate(node.navSegments)).subscribe(() => {
      this.closeMenuActions();
    });
  }

  onOpenMenuNav(): void {
    this.menuOpened = !this.menuOpened;
  }

  onCloseMenuNav(): void {
    this.closeMenuActions();
  }

  closeMenuActions(): void {
    this.menuOpened = false;
    this.closeMenu.emit();
  }

  onLogoClicked(): void {
    // this.router.navigate([Module.Backoffice, Page.DashboardMerchantPortal]);
  }


  onMenuNodeHover(isHovered: boolean): void {
    this.itemHovered = isHovered;
  }
}
