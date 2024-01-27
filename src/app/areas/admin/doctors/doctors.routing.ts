import { DoctorsAddComponent } from './doctors-add/doctors-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { DoctorsEditComponent } from './doctors-edit/doctors-edit.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DoctorsComponent,
      },
      {
        path: 'add',
        component: DoctorsAddComponent,
      },
      {
        path: 'edit/:id',
        component: DoctorsEditComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule { }
