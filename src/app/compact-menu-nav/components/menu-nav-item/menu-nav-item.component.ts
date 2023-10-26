import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { from } from 'rxjs';
import { MenuNavNode } from 'src/app/models/menu-nav-node.model';


@Component({
  selector: 'ga-menu-nav-item',
  templateUrl: './menu-nav-item.component.html',
})
export class MenuNavItemComponent {
  @Input() node!: MenuNavNode;
  @Input() menuOpened?: boolean;
  @Output() readonly closeMenu = new EventEmitter<undefined>();

  itemHovered = false;

  constructor(private readonly router: Router) {}

 

  onToggleClick(node: MenuNavNode) {
    if (node.children.length) {
      node.expanded = !node.expanded;
    } else {
      this.onMenuNodeClick(node);
    }
  }

  onMenuNodeClick(node: MenuNavNode): void {
    from(this.router.navigate(node.navSegments)).subscribe(() => {
      this.menuOpened = false;
      this.closeMenu.emit();
    });
  }

  onMenuNodeHover(isHovered: boolean): void {
    this.itemHovered = isHovered;
  }
}
