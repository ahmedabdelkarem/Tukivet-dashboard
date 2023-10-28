import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutingModule } from './admin-layout.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from 'src/app/shared/materialDesign/material-design.module';




@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule,
    AdminLayoutRoutingModule,
    SharedModule,
    CommonModule,
    MaterialDesignModule,

  ],
  providers: [],
})
export class AdminLayoutModule { }
