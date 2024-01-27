import { WeekDays } from '../../../../../enums';
import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'users-add',
  templateUrl: './users-add.component.html'
})
export class UsersAddComponent {
  photoImage!: string | ArrayBuffer | null;
  fileExtension: string | undefined;
  selectFile!: HTMLInputElement;
  singleFile!: File;
  photoName!: string;
  userID!: number;
  userPrimaryInformation: any;
  userProviderPrimaryInformation: any;
  userProviderSpecialty: any;
  userWorkingDetailsAndHours: any;
  WeekDays = WeekDays
  nationalities: any;
  userForm!: FormGroup;
  genders = [{ id: '1', name: 'male' },
  { id: '2', name: 'female' },
  ]
  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder) { }

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
    this.getAllNationality();
    this.initializeForm();

  }


  addImage() {
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


  getAllNationality() {
    this.usersService.getAllNationality().subscribe((res) => {
      this.nationalities = res.result;
      //console.log(res);
    });
  }

  rejectRequest() {
    this.router.navigate(['/users']);

  }



  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      dateOfBirth: ['', Validators.required],
      nationalityId: [Validators.required],
      gender: [Validators.required],

    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      // Call the user service to add the user
      this.usersService.addUser(userData).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/users']);
          this.toastr.success('تم اضافه المستخدم');
          // You can perform additional actions after a successful API call
        },
        (error) => {
          console.error('Error adding user:', error);
          // Handle errors
        }
      );
    }
  }

}

export class ExampleComponent {
  days = Object.values(WeekDays.Monday);

}
