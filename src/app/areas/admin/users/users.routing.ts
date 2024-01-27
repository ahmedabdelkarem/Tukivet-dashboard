import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersInfoComponent } from './users-info/users-info.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'add',
        component: UsersAddComponent,
      },
      {
        path: 'info/:id',
        component: UsersInfoComponent,
      },
      {
        path: 'edit/:id',
        component: UsersEditComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoutingModule { }
