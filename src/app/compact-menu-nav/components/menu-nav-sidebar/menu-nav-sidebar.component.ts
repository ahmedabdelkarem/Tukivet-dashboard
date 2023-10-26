import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { MenuNavNode } from 'src/app/models/menu-nav-node.model';


@Component({
  selector: 'ga-menu-nav-sidebar',
  templateUrl: './menu-nav-sidebar.component.html',
})
export class MenuNavSidebarComponent  {
  @Input() activeLink: MenuNavNode | undefined;
  @Input() menuNodes: Array<MenuNavNode> | undefined;
  @Input() menuOpened?: boolean;
  @Input() currentPage?: string | null;
  fixedMenuNodes  =  [new MenuNavNode(
    'Users',
    'users',
    ['', ''],
    [],
    
  ),
  new MenuNavNode(
    'Settings',
    'settings',
    ['', ''],
    [],
    
  ),
  new MenuNavNode(
    'Logout',
    'logout',
    ['', ''],
    [],
    
  ),
]
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

  onCloseMenuNav(): void {
    this.closeMenuActions();
  }

  closeMenuActions(): void {
    this.menuOpened = false;
    this.closeMenu.emit();
  }
}
