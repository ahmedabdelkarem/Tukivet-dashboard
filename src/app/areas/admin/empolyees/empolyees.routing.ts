import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpolyeesComponent } from './empolyees.component';



const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            component: EmpolyeesComponent,
        }
    ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpolyeesRoutingModule { }
