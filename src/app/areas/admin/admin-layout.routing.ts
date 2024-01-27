import { UsersModule } from './users/users.module';
import { DepartmentModule } from './department/department.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';



const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./request/request.module').then(m => m.OrganizationModule),
      },
      {
        path: "users",
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: "doctors",
        loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule),
      },
      {
        path: "veterinary-care",
        loadChildren: () => import('./veterinary-care/veterinary-care.module').then(m => m.VeterinaryModule),
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule { }
