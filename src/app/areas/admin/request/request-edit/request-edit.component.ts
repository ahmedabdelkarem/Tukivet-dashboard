import { Component } from '@angular/core';

@Component({
  selector: 'request-edit',
  templateUrl: './request-edit.component.html'
})
export class RequestEditComponent {
  photoImage!: string | ArrayBuffer | null;
  fileExtension: string | undefined;
  selectFile!: HTMLInputElement;
  singleFile!: File;
  photoName!: string;
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
