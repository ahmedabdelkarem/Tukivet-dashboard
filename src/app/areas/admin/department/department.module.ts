import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from 'src/app/shared/materialDesign/material-design.module';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DepartmentComponent } from './department.component';
import { DepartmentRoutingModule } from './department.routing';
import { AddNewDepartmentComponent } from './dialog/create-new-department/add-new-department.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    AddNewDepartmentComponent
  ],
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    DepartmentRoutingModule,
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
        ReactiveFormsModule
  ],
  providers: [],
})
export class DepartmentModule { }
