import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PolicyComponent } from './policy/policy.component';

@NgModule({
  declarations: [PolicyComponent],
  imports: [CommonModule, PolicyRoutingModule, SharedModule],

})
export class HomeModule { }
