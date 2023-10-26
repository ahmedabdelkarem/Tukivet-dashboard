import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit,HostBinding } from '@angular/core';
import {  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlsOf, ControlValueAccessor, FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  isDark = false;
  registerForm!: FormGroup<ControlsOf<{ email: string | null;}>>;
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
      email: ['', [Validators.required]],
     
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
    this.f['email'].setErrors({ loginError: null });
    
    this.f['email'].updateValueAndValidity();
   
  }

  goToRegister() {
    this.router.navigateByUrl('auth/register');
  }

  private sendRequest() {
    
  }

 
}
