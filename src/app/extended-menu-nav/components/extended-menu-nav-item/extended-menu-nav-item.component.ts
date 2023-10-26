import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { from } from 'rxjs';
import { MenuNavNode } from 'src/app/models/menu-nav-node.model';


@Component({
  selector: 'ga-extended-menu-nav-item',
  templateUrl: './extended-menu-nav-item.component.html',
})
export class ExtendedMenuNavItemComponent implements AfterViewInit {
  @ViewChild('menuSubItem', { static: false }) menuSubItem!: ElementRef<any>;
  @Input() node!: MenuNavNode;
  @Input() menuOpened?: boolean;
  @Output() readonly closeMenu = new EventEmitter<undefined>();

  itemHovered = false;
  submenuClicked = false;
  submenuNode!: HTMLElement;

  constructor(
    private readonly router: Router,
    private elementRef: ElementRef
  ) {}

 

  ngAfterViewInit() {
    this.submenuNode =
      this.elementRef.nativeElement.querySelector('.menu-node-content');
  }

  onToggleClick(node: MenuNavNode) {
    if (node.children.length) {
      node.expanded = !node.expanded;
    }
  }

  onMenuNodeClick(node: MenuNavNode): void {
    if (this.submenuNode) {
      this.submenuNode.style.display = 'block';
    }
    this.submenuClicked = false;
    from(this.router.navigate(node.navSegments)).subscribe(() => {});
  }

  onSubmmenuNodeClick(node: MenuNavNode, event: any): void {
    event.stopPropagation();
    if (this.submenuNode) {
      this.submenuNode.style.display = 'none';
    }
    this.submenuClicked = true;
    from(this.router.navigate(node.navSegments)).subscribe(() => {});
  }

  onMenuNodeHover(isHovered: boolean): void {
    this.itemHovered = isHovered;
    this.submenuClicked = false;
    if (this.submenuNode) {
      !this.itemHovered
        ? (this.submenuNode.style.display = 'none')
        : (this.submenuNode.style.display = 'block');
    }
  }
}
