import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuNavButtonComponent } from './components/menu-nav-button/menu-nav-button.component';
import { MenuNavItemComponent } from './components/menu-nav-item/menu-nav-item.component';
import { MenuNavSidebarComponent } from './components/menu-nav-sidebar/menu-nav-sidebar.component';
import { MenuNavComponent } from './menu-nav.component';
import { MaterialDesignModule } from '../shared/materialDesign/material-design.module';

@NgModule({
  declarations: [
    MenuNavComponent,
    MenuNavButtonComponent,
    MenuNavSidebarComponent,
    MenuNavItemComponent,
  ],
  imports: [CommonModule, MaterialDesignModule],
  exports: [MenuNavComponent, MenuNavButtonComponent, MenuNavSidebarComponent],
})
export class CompactMenuNavModule {}
