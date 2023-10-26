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
  selector: 'add-new-empolyee',
  templateUrl: './add-new-empolyee.component.html',
})

export class AddNewEmpolyeeComponent {

  readonly form: FormGroup<any>;
  loading = false;
  singleFile!: File;
  photoName!: string;
  fileExtension: string | undefined;
  photoImage!: string | ArrayBuffer | null;
  selectFile!: HTMLInputElement;
  get phones() {
    return this.form.get('phones') as FormArray<any>;
  }

  constructor(
    readonly dialogRef: MatDialogRef<AddNewEmpolyeeComponent>,
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
  addImage(){
    this.selectFile = document.createElement('input');
    this.selectFile.type = 'file';
    this.selectFile.accept = 'image/*';
    this.selectFile.click();
    this.selectFile.addEventListener('change', this.onSelectFile.bind(this));
  }
  onSelectFile(event: Event) {
    // called each time file input changes
     const target = event.target as HTMLInputElement;
     const files = target.files;
     if (files != null) {
      let size_file = files[0].size / 1024 / 1024;
      this.singleFile = files[0];
     }
   
   
    if (files && files[0]) {
      this.photoName = this.singleFile.name;

      var allowedExtensions = [
        'jpg',
        'jpeg',
        'png',
        'JPG',
        'JPEG',
        'JFIF',
        'BMP',
        'SVG',
      ];
      this.fileExtension = this.photoName.split('.').pop();

      let a = allowedExtensions.some((e) => e == this.fileExtension);
    
        if (a) {
          

          var reader = new FileReader();

          reader.readAsDataURL(files[0]); // read file as data url

          reader.onload = (event1: Event) => {
            // called once readAsDataURL is completed
            this.photoImage = reader.result;
          };
        
        }  
      }
  }
}

