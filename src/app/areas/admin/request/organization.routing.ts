import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestEditComponent } from './request-edit/request-edit.component';
import { RequestComponent } from './request.component';



const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            component: RequestComponent,
        },
        {
          path: 'edit/:id',
          component: RequestEditComponent,
      }
    ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoutingModule { }
