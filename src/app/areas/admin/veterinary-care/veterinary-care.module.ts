import { NgModule } from '@angular/core';
import { DoctorsRoutingModule } from './veterinary-care.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from 'src/app/shared/materialDesign/material-design.module';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { VeterinaryCareComponent } from './veterinary-care.component';
import { VeterinaryCareAddComponent } from './veterinary-care-add/veterinary-care-add.component';
import { VeterinaryCareEditComponent } from './veterinary-care-edit/veterinary-care-edit.component';


@NgModule({
  declarations: [
    VeterinaryCareComponent,
    VeterinaryCareAddComponent,
    VeterinaryCareEditComponent
  ],
  imports: [
    NgStepperModule,
    CdkStepperModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    DoctorsRoutingModule,
    RouterModule,
    SharedModule,
    CommonModule,
    MaterialDesignModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),

  ],
  providers: [],
})
export class VeterinaryModule { }
