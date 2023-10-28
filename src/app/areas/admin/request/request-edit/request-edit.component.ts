import { Component } from '@angular/core';
import { MembersService } from '../service/members.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  userID:any;
  userPrimaryInformation: any;
  userProviderPrimaryInformation: any;
  userProviderSpecialty: any;
  userWorkingDetailsAndHours: any;

  constructor(private membersService: MembersService,private activatedRoute: ActivatedRoute,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userID = this.activatedRoute.snapshot.params['id'];

    // const filter: paramsRequest = {
    //   page: this.page,
    //   pageSize: this.pageSize,
    //   ServiceProviderTypes: this.selectServiceProviderTypes,
    //   ActivationStatus: this.selectActivationStatus,
    //   AnimalCategories: this.selectAnimalCategories,
    //   ServiceProviderId: this.numberValue,
    // };
    this.getServiceProviderPrimaryInformation();
    this.getServiceProviderWorkingAndScientificExperience();
    this.getServiceProviderSpecialty();
    this.getServiceProviderWorkingDetailsAndHours()
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
  getServiceProviderPrimaryInformation() {
    this.membersService.getServiceProviderPrimaryInformation(`${this.userID}`).subscribe((res) => {
      this.userPrimaryInformation = res.result;
    });
  }
  getServiceProviderWorkingAndScientificExperience() {
    this.membersService.getServiceProviderWorkingAndScientificExperience(`${this.userID}`).subscribe((res) => {
      this.userProviderPrimaryInformation = res.result;
      //console.log(res);
    });
  }

  getServiceProviderSpecialty() {
    this.membersService.getServiceProviderSpecialty(`${this.userID}`).subscribe((res) => {
      this.userProviderSpecialty= res.result;
      //console.log(res);
    });
  }

  getServiceProviderWorkingDetailsAndHours() {
    this.membersService.getServiceProviderWorkingDetailsAndHours(`${this.userID}`).subscribe((res) => {
      this.userWorkingDetailsAndHours= res.result;
     // console.log(res);
    });
  }

  rejectRequest() {
    const payload = {
      activationStatus: 1,
      serviceProviderId: this.userID
    };

    this.membersService.updateActivationStatus(payload)
      .subscribe(
        response => {
          console.log('POST request successful:', response);
          // Handle the response as needed
          this.toastr.error('تم رفض الطلب');

        },
        error => {
          console.error('POST request error:', error);
          // Handle the error as needed
        }
      );
  }

  acceptRequest() {
    const payload = {
      activationStatus: 2,
      serviceProviderId: this.userID
    };

    this.membersService.updateActivationStatus(payload)
      .subscribe(
        response => {
          console.log('POST request successful:', response);
          this.toastr.success('تم قبول الطلب');

        },
        error => {
          console.error('POST request error:', error);
          // Handle the error as needed
        }
      );
  }
}
