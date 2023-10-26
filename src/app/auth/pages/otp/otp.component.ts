import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit,HostBinding } from '@angular/core';
import {  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlsOf, ControlValueAccessor, FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OTPSize, OTPStatus } from '../../components/otp/enum';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
})
export class OtpComponent implements OnInit {
  isDark = false;
  otpForm!: FormGroup<ControlsOf<{ otp: string | null;}>>;
  submitted = false;
  loading = false;
  hide = true;
  public OTPSize = OTPSize;
  public OTPStatus = OTPStatus;
  @HostBinding('class')
  get classes(): string {
    return `flex justify-center items-center h-full`
  }
  constructor(
   
   
    private fb: FormBuilder,
    private router: Router,
  
  ) {}

  get f() {
    return this.otpForm.controls;
  }

  ngOnInit() {
    this.validateLoginForm();
 
  }


  validateLoginForm(): void {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
     
    });
  }

  onSubmit() {
    this.otpForm.markAllAsTouched();

    if (this.otpForm.valid) {
      this.submitted = true;
      this.loading = true;
      this.sendRequest();
    } else {
     
    }
  }

  onChange(event:any = null) {
    if (event) {
      event.target.value = event.target.value.toLowerCase();
    }
    this.f['otp'].setErrors({ loginError: null });
    
    this.f['otp'].updateValueAndValidity();
   
  }

  goToRegister() {
    this.router.navigateByUrl('auth/register');
  }

  private sendRequest() {
    
  }

 
}
