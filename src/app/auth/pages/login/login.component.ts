import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit,HostBinding } from '@angular/core';
import {  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlsOf, ControlValueAccessor, FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isDark = false;
  loginForm!: FormGroup<ControlsOf<{ username: string | null; password: string | null }>>;
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
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.validateLoginForm();
 
  }


  validateLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
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
    this.f['username'].setErrors({ loginError: null });
    this.f['password'].setErrors({ loginError: null });
    this.f['username'].updateValueAndValidity();
    this.f['password'].updateValueAndValidity();
  }

  goToRegister() {
    this.router.navigateByUrl('auth/register');
  }

  private sendRequest() {
    
  }

 
}
