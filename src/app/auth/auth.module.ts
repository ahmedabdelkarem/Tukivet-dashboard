import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { FinalRegisterComponent } from './pages/final-register/final-register.component';
import { OtpModule } from './components/otp/otp.module';
import { OtpComponent } from './pages/otp/otp.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FinalRegisterComponent,
    OtpComponent
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule,ReactiveFormsModule,OtpModule],
})
export class AuthModule {}
