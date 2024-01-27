import { WeekDays } from '../../../../../enums';
import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  serviceProviderType: Record<string, number | string>;
  orderId: number;
  animalCategories: Array<Record<string, number | string>>;
  phoneNumber: number | string;
  name_en: string;
  yearsOfExperience: number;
  name_ar: string;
  registrationDate: string;
  noOfRequests: number;
  activationStatus: Record<string, number | string>;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'users-info',
  templateUrl: './users-info.component.html'
})
export class UsersInfoComponent {
  displayedColumns: string[] = [
    'orderId',
    'name',
    'serviceProviderType',
    'animalCategories',
    'phoneNumber',
    'yearsOfExperience',
    'registrationDate',
    'noOfRequests',
    'activationStatus',
    'sub-menu'
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  page = 1;
  length: number = 100;
  pageSize: number = 20;
  serviceProviderTypes: Array<Record<string, string | number>> = [];
  serviceProviderActivationStatus: Array<Record<string, string | number>> = [];
  animalCategoriesDTO: Array<Record<string, string | number>> = [];
  selectServiceProviderTypes: Array<number | string> = [];
  selectAnimalCategories: Array<number | string> = [];
  selectActivationStatus: Array<number | string> = [];
  numberValue!: number;

  userID!: number;
  nationalities: any;
  userForm!: FormGroup;
  genders = [{ id: '1', name: 'male' },
  { id: '2', name: 'female' },
  ]
  userInformation: any;
  userorders: any;
  userAddresses: any;
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
    this.initializeForm();
    this.getUserId();
    this.getUserOrders();
    this.getUserAddress();
  }





  getAllNationality() {
    this.usersService.getAllNationality().subscribe((res) => {
      this.nationalities = res.result;
      //console.log(res);
    });
  }

  getUserId() {
    this.usersService.getUserById(this.userID).subscribe((res) => {
      this.userInformation = res.result;
      console.log(res);
    });
  }
  getUserOrders() {
    this.dataSource.data = [];
    this.usersService.getUserOrders(this.userID, 1).subscribe((res) => {
      this.dataSource.data = res.result;
      console.log(this.userorders);
    });
  }
  getUserAddress() {
    this.usersService.getUserAddress(this.userID).subscribe((res) => {
      this.userAddresses = res.result;
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



}


