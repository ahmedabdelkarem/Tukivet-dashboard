import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ga-menu-nav-button',
  templateUrl: './menu-nav-button.component.html',
})
export class MenuNavButtonComponent {
  @Input() menuOpened?: boolean;
  @Output() readonly openMenu = new EventEmitter<undefined>();

  onOpenMenuNav(): void {
    this.menuOpened = !this.menuOpened;
    this.openMenu.emit();
  }
}
