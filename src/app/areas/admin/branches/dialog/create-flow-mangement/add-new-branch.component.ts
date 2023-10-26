import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ControlsOf, FormArray, FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';

import { finalize } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface dataNewBranch {
  Organization: string;
 
}
export interface customInput {
  organization: string;
  code :string;
  nameArabic:string;
  nameEnglish:string;
  addressEnglish:string;
  addressArabic:string;
  mapUrl:string;
  phones:Array<any>
}

@UntilDestroy()
@Component({
  selector: 'ga-add-new-branch',
  templateUrl: './add-new-branch.component.html',
})
export class AddNewBranchComponent {
  

  readonly form: FormGroup<any>;
  loading = false;
  get phones() {
    return this.form.get('phones') as FormArray<any>;
  }

  constructor(
    readonly dialogRef: MatDialogRef<AddNewBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataNewBranch,
    private fb: FormBuilder
  ) {
    this.form = this.initForm();
    //this.form.controls.organization.disable;
  }

  private readonly initForm = (): FormGroup<ControlsOf<customInput>> =>
    new FormGroup<ControlsOf<customInput>>({
      organization: new FormControl({value: 'organization', disabled: true}, [Validators.required, ]),
      code: new FormControl(''),
      nameArabic: new FormControl('', [
        Validators.required,
        
      ]),
      nameEnglish: new FormControl('', [
        Validators.required,
        
      ]),
      addressEnglish: new FormControl('', [
        Validators.required,
        
      ]),
      addressArabic: new FormControl('', [
        Validators.required,
        
      ]),
      mapUrl: new FormControl('', [
        Validators.required,
        
      ]),
      phones: this.fb.array([
        this.fb.group({
          phone: ['', Validators.required],
        })
      ])   
    });

  onSubmit() {
   
    if (this.form.valid) {
     
    }
  }
  change(){
    console.log(this.form.controls.phones.controls[0].controls);
    
  }
  addNewPhone(){
    this.form.controls.phones.controls.push(  this.fb.group({
      phone: ['', Validators.required],
    }))
  }
}
