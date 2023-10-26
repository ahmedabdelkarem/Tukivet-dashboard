import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './components/otp/otp.component';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OtpComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OtpComponent,
      multi: true,
    },
  ],
  exports:[OtpComponent]
})
export class OtpModule { }
