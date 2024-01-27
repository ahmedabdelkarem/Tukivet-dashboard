import { WeekDays } from '../../../../../enums';
import { Component } from '@angular/core';
import { DoctorsService } from '../service/doctors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { AttachmentType } from "../models/attachment-type";
import { Observable, forkJoin, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Box {
  label: string;
  isActive: boolean;
  image: string;
  id: number
}

@Component({
  selector: 'doctors-add',
  templateUrl: './doctors-add.component.html'
})

export class DoctorsAddComponent {
  photoName!: string;
  userID!: number;
  userPrimaryInformation: any;
  userProviderPrimaryInformation: any;
  userProviderSpecialty: any;
  userWorkingDetailsAndHours: any;
  WeekDays = WeekDays
  doctorForm!: FormGroup;
  nationalIDForm!: FormGroup;
  specilizationForm!: FormGroup;
  otherInformationForm!: FormGroup;
  nationalForm!: FormGroup;
  workExperinceForm!: FormGroup;
  nationalities: any;
  districts: any;
  newDoctorResult: number | undefined;
  selectedBoxId: number | null = null;
  timeForm!: FormGroup;
  districtForm!: FormGroup;
  myForm!: FormGroup;

  boxes: Box[] = [
    { id: 1, label: 'خيول ', isActive: false, image: 'animal1.png' },
    { id: 2, label: 'إبل', isActive: false, image: 'animal2.png' },
    { id: 3, label: ' صقور', isActive: false, image: 'animal3.png' },
    { id: 4, label: 'ماشية', isActive: false, image: 'animal4.png' },
    { id: 5, label: 'الاغنام والماعز', isActive: false, image: 'animal5.png' },
    { id: 6, label: 'طيور', isActive: false, image: 'animal6.png' },
    { id: 7, label: 'دواجن', isActive: false, image: 'animal7.png' },
    { id: 8, label: 'حيوانات أليفة ', isActive: false, image: 'animal8.png' },
    { id: 9, label: 'حيوانات اخري', isActive: false, image: 'animal9.png' },


  ];

  constructor(private doctorsService: DoctorsService, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, private router: Router, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllNationality();
    this.initializeForm();
    this.initializeAddSaveWorkExperinceForm();
    this.initializeNationalIDForm();
    this.updateOtherInformationForm();
    this.getAllDistrict();

    this.myForm = this.fb.group({
      times: this.fb.array([]),
      // other form controls
    });
  }


  getAllNationality() {
    this.doctorsService.getAllNationality().subscribe((res) => {
      this.nationalities = res.result;
      //console.log(res);
    });
  }

  getAllDistrict() {
    this.doctorsService.getAllDistrict().subscribe((res) => {
      this.districts = res.result;
      //console.log(res);
    });
  }
  rejectRequest() {
    this.router.navigate(['/doctors']);

  }
  initializeForm(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      serviceId: [1],
      nationalityID: [Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^966/)]],
      address: [''],
      birthDate: ['', Validators.required],
      accountNumber: "string"

    });
  }
  initializeNationalIDForm(): void {
    this.nationalForm = this.fb.group({
      nationalId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      idImagePath: ['', Validators.required],

    });
  }
  checkNationalIdValidity() {
    const nationalIdControl = this.nationalForm.get('nationalId');

    if (nationalIdControl!.invalid) {
      if (nationalIdControl!.hasError('required')) {
        this.toastr.error('National ID is required');

      } else if (nationalIdControl!.hasError('minlength')) {
        this.toastr.error('National ID must be at least 10 characters long.');
      } else if (nationalIdControl!.hasError('maxlength')) {
        this.toastr.error('National ID cannot be more than 10 characters long.');
      }

      // You can customize the alerts based on your requirements.
    }
  }
  checkPhoneNumberValidity() {
    const phoneNumerControl = this.doctorForm.get('phoneNumber');

    if (phoneNumerControl!.invalid) {
      if (phoneNumerControl!.hasError('required')) {
        this.toastr.error('يجب ادخال رقم الجوال');

      } else if (phoneNumerControl!.hasError('pattern')) {
        this.toastr.error('يجب ان يبدأ رقم الجوال ب 966');
      }

      // You can customize the alerts based on your requirements.
    }
  }
  checkBirthDayValidity() {
    const birthDate = this.doctorForm.get('birthDate');

    if (birthDate!.invalid) {
      if (birthDate!.hasError('required')) {
        this.toastr.error('يجب ادخال تاريخ الميلاد ');

      }

      // You can customize the alerts based on your requirements.
    }
  }
  updateOtherInformationForm(): void {
    this.otherInformationForm = this.fb.group({
      selfPhotoImagePath: [''],
      title: [''],
      description: [''],
    });
  }
  initializeAddSaveWorkExperinceForm(): void {
    this.workExperinceForm = this.fb.group({
      yearsOfExperience: [],
      careType: [],
      collegeDegreePhotoPath: [''],
      practicingTheProfessionCertificatePhotoPath: ['']
    });
  }
  onSubmit(): void {
    this.checkPhoneNumberValidity();
    this.checkBirthDayValidity();
    if (this.doctorForm.valid) {
      const doctorData = this.doctorForm.value;
      // Call the user service to add the user
      this.doctorsService.addDoctor(doctorData).subscribe(
        (response) => {
          // console.log('User added successfully:', response);
          this.newDoctorResult = response.result;
          this.toastr.success('تم اضافه دكتور');
        },
        (error) => {
          console.error('Error adding user:', error);
          this.toastr.error('حدث خطأ');

          // Handle errors
        }
      );
    }
  }
  updateSpecilization(): void {
    const selectedBoxIds: number[] = this.boxes
      .filter(box => box.isActive)
      .map(box => box.id);
    if (selectedBoxIds.length > 0) {
      const requestData = {
        serviceProvidersAnimalsCategories: selectedBoxIds

      };

      console.log(requestData)
      this.doctorsService.addAnimalCategoriesAndTypes(this.newDoctorResult, requestData)
        .subscribe(
          (response: any) => {
            this.toastr.success('تم اضافه التخصص بنجاح');
            // Handle any additional logic or UI updates...
          },
          (error: any) => {
            console.error('Error adding animal categories and types:', error);
            this.toastr.error('حدث خطأ ');
          }
        );
    } else {
      this.toastr.warning('Please select a box before adding animal categories and types');
    }
  }
  updateOtherInformation(): void {
    const title = this.otherInformationForm.get('title')?.value;
    const description = this.otherInformationForm.get('description')?.value;
    const idImageFile: File = this.otherInformationForm.get('selfPhotoImagePath')?.value;
    const attachmentPageType = 1;

    this.doctorsService.uploadFile(idImageFile, AttachmentType.ServiceProviderNationalID, attachmentPageType, this.newDoctorResult)
      .subscribe((fileUrl: string) => {
        this.doctorsService.updateOtherInformation(title, description, fileUrl, attachmentPageType, this.newDoctorResult)
          .subscribe(response => {
            // Handle the response as needed
            this.toastr.success('تم اضافة معلومات اخري بنجاح');
          }, error => {
            // Handle the error if the HTTP request fails
            console.error('Error uploading ID:', error);
            this.toastr.error('فشلت عملية  اضافة معلومات اخري');
          });
      }, error => {
        // Handle the error if the file upload fails
        console.error('Error uploading file:', error);
        this.toastr.error('فشلت عملية رفع الملف');
      });
  }
  toggleBox(box: Box): void {
    box.isActive = !box.isActive;
    this.selectedBoxId = box.id;

  }

  deleteBox(box: Box): void {
    const index = this.boxes.indexOf(box);
    if (index !== -1) {
      this.boxes.splice(index, 1);
    }
  }

  updateNationalID(): void {
    const nationalId = this.nationalForm.get('nationalId')!.value;
    const idImageFile: File = this.nationalForm.get('idImagePath')!.value;
    const attachmentPageType = 1;

    this.doctorsService.uploadFile(idImageFile, AttachmentType.ServiceProviderNationalID, attachmentPageType, this.newDoctorResult)
      .subscribe((fileUrl: string) => {
        this.doctorsService.updateNationalID(nationalId, fileUrl, attachmentPageType, this.newDoctorResult)
          .subscribe(response => {
            // Handle the response as needed
            this.toastr.success('تم اضافة رقم الهوية بنجاح');
          }, error => {
            // Handle the error if the HTTP request fails
            console.error('Error uploading ID:', error);
            this.toastr.error('فشلت عملية رفع الهوية');
          });
      }, error => {
        // Handle the error if the file upload fails
        console.error('Error uploading file:', error);
        this.toastr.error('فشلت عملية رفع الملف');
      });
  }


  updateAddSaveWorkExperince(): void {
    const yearsOfExperience = this.nationalForm.get('yearsOfExperience')?.value;
    const idImageFile1: File = this.nationalForm.get('collegeDegreePhotoPath')?.value;
    const idImageFile2: File = this.nationalForm.get('practicingTheProfessionCertificatePhotoPath')?.value;
    const attachmentPageType = 1;

    if (yearsOfExperience !== null && idImageFile1 !== null && idImageFile2 !== null) {
      forkJoin([
        this.doctorsService.uploadFile(idImageFile1, AttachmentType.ServiceProviderNationalID, attachmentPageType, this.newDoctorResult),
        this.doctorsService.uploadFile(idImageFile2, AttachmentType.AnimalPhoto, attachmentPageType, this.newDoctorResult)
      ]).subscribe(([fileUrl1, fileUrl2]) => {
        const dataToSend = {
          serviceProviderModel: { /* Include necessary fields here */ },
          yearsOfExperience: yearsOfExperience,
          collegeDegreePhotoPath: fileUrl1.toString(), // Convert the URL to a string
          practicingTheProfessionCertificatePhotoPath: fileUrl2.toString() // Convert the URL to a string
        };

        this.doctorsService.addSaveWorkExperince(dataToSend, attachmentPageType, this.newDoctorResult)
          .subscribe(response => {
            this.toastr.success('تم اضافة رقم الهوية بنجاح');
          }, error => {
            console.error('Error making API call:', error);
            this.toastr.error('فشلت عملية رفع الهوية');
          });
      }, error => {
        console.error('Error uploading files:', error);
        this.toastr.error('فشلت عملية رفع الملف');
      });
    } else {
      console.error('One or more form controls are null');
      // Handle the case where form controls are null, e.g., show an error message

    }
  }


  get timesArray() {
    return (this.myForm.get('times') as FormArray).controls as FormGroup[];
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      time1: new FormControl(''),
      time2: new FormControl('')
    });
  }

  addTimeFields() {
    const timesArray = this.myForm.get('times') as FormArray;
    timesArray.push(this.createFormGroup());
  }
}
