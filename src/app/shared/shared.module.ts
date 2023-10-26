import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MaterialDesignModule } from './materialDesign/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule,MaterialDesignModule],
  exports: [FooterComponent, HeaderComponent],
})
export class SharedModule {}
