import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MaterialDesignModule } from './materialDesign/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeFormatPipe } from 'src/pipes/time-format.pipe';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, TimeFormatPipe],
  imports: [CommonModule, MaterialDesignModule],
  exports: [FooterComponent, HeaderComponent, TimeFormatPipe],
})
export class SharedModule { }
