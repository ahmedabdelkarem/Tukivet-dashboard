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
      path: "branches",
      loadChildren: () => import('../admin/branches/branches.module').then(m => m.BranchesModule),
    },
    {
      path: "department",
      loadChildren: () => import('../admin/department/department.module').then(m => m.DepartmentModule),
    },
    {
      path: "empolyees",
      loadChildren: () => import('../admin/empolyees/empolyees.module').then(m => m.EmpolyessModule),
    },

  ]
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule { }
