import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeterinaryCareComponent } from './veterinary-care.component';
import { VeterinaryCareAddComponent } from './veterinary-care-add/veterinary-care-add.component';
import { VeterinaryCareEditComponent } from './veterinary-care-edit/veterinary-care-edit.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VeterinaryCareComponent,
      },
      {
        path: 'add',
        component: VeterinaryCareAddComponent,
      },
      {
        path: 'edit/:id',
        component: VeterinaryCareEditComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule { }
