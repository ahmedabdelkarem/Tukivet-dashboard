import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit,HostBinding } from '@angular/core';
import {  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlsOf, ControlValueAccessor, FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OTPSize, OTPStatus } from '../../components/otp/enum';


@Component({
  selector: 'app-final-register',
  templateUrl: './final-register.component.html',
})
export class FinalRegisterComponent implements OnInit {
  isDark = false;
  registerForm!: FormGroup<ControlsOf<{ mobile: string | null; password: string | null ; verifyPassword: string | null }>>;
  submitted = false;
  loading = false;
  hide = true;
 
  
  @HostBinding('class')
  get classes(): string {
    return `flex justify-center items-center h-full`
  }
  constructor(
   
   
    private fb: FormBuilder,
    private router: Router,
  
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.validateLoginForm();
 
  }


  validateLoginForm(): void {
    this.registerForm = this.fb.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      verifyPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
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
  
    this.resetError();
    this.checkPassword();
    this.updateValueAndValidity();
  }
  private checkPassword() {
    const password1 = this.f['password'].value;
    const password2 = this.f['verifyPassword'].value;
    if (password1 !== password2) {
      this.f['password'].setErrors({ passwordUnmatch: true });
      this.f['verifyPassword'].setErrors({ passwordUnmatch: true });
    }
  }

  private resetError() {
    this.f['password'].setErrors({ passwordUnmatch: true });
    this.f['verifyPassword'].setErrors({ passwordUnmatch: true });
  }

  private updateValueAndValidity() {
    this.f['mobile'].updateValueAndValidity();
   
    this.f['password'].updateValueAndValidity();
    this.f['verifyPassword'].updateValueAndValidity();
  }
 

  goToLogin() {
    this.router.navigateByUrl('auth/login');
  }
  private sendRequest() {
    
  }

 
}
