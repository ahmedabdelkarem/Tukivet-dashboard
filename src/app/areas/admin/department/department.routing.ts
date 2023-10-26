import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department.component';



const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            component: DepartmentComponent,
        }
    ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule { }
