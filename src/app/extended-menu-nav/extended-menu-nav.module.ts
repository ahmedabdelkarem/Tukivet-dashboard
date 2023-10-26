import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ExtendedMenuNavButtonComponent } from './components/extended-menu-nav-button/extended-menu-nav-button.component';
import { ExtendedMenuNavItemComponent } from './components/extended-menu-nav-item/extended-menu-nav-item.component';
import { ExtendedMenuNavSidebarComponent } from './components/extended-menu-nav-sidebar/extended-menu-nav-sidebar.component';
import { ExtendedMenuNavComponent } from './extended-menu-nav.component';
import { MaterialDesignModule } from '../shared/materialDesign/material-design.module';

@NgModule({
  declarations: [
    ExtendedMenuNavComponent,
    ExtendedMenuNavButtonComponent,
    ExtendedMenuNavSidebarComponent,
    ExtendedMenuNavItemComponent,
  ],
  imports: [CommonModule, MaterialDesignModule, ScrollingModule],
  exports: [
    ExtendedMenuNavComponent,
    ExtendedMenuNavButtonComponent,
    ExtendedMenuNavSidebarComponent,
  ],
})
export class ExtendedMenuNavModule {}
