import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { paramsRequest } from './models/params';
import { MembersService } from './service/members.service';
export interface PeriodicElement {
  serviceProviderType: Record<string, number | string>;
  id: number;
  animalCategories: Array<Record<string, number | string>>;
  phoneNumber: number | string;
  name_en: string;
  yearsOfExperience: number;
  name_ar: string;
  registrationDate: string;
  activationStatus: Record<string, number | string>;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'request',
  templateUrl: './request.component.html',
})
export class RequestComponent {
  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'serviceProviderType',
    'animalCategories',
    'phoneNumber',
    'yearsOfExperience',
    'activationStatus',
    'registrationDate',
    'sub-menu',
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
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  readonly pageSizes = [5, 10, 20];
  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    const filter: paramsRequest = {
      page: this.page,
      pageSize: this.pageSize,
      ServiceProviderTypes: this.selectServiceProviderTypes,
      ActivationStatus: this.selectActivationStatus,
      AnimalCategories: this.selectAnimalCategories,
      ServiceProviderId: this.numberValue,
    };
    this.getAllServiceProviders(filter);
    this.getAllFilter();
  }

  pageChange(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.page = pageEvent.pageIndex + 1;
    const filter: paramsRequest = {
      page: this.page,
      pageSize: this.pageSize,
      ServiceProviderTypes: this.selectServiceProviderTypes,
      ActivationStatus: this.selectActivationStatus,
      AnimalCategories: this.selectAnimalCategories,
      ServiceProviderId: this.numberValue,
    };
    this.getAllServiceProviders(filter);
  }

  getAllServiceProviders(filter: paramsRequest) {
    this.dataSource.data = [];
    this.membersService.getAllServiceProviders(filter).subscribe((res) => {
      console.log(res);
      this.dataSource.data = res.result;
    });
  }

  getAllFilter() {
    this.membersService.getAllFilter().subscribe((res) => {
      console.log(res);
      if (res.result.serviceProviderTypes.length > 0) {
        this.serviceProviderTypes = res.result.serviceProviderTypes;
      }
      if (res.result.serviceProviderActivationStatus.length > 0) {
        this.serviceProviderActivationStatus =
          res.result.serviceProviderActivationStatus;
      }
      if (res.result.animalCategoriesDTO.length > 0) {
        this.animalCategoriesDTO = res.result.animalCategoriesDTO;
      }
    });
  }

  selectFilter($event: any, id: number | string, type: number) {
    // this stops the menu from closing
    $event.stopPropagation();
    $event.preventDefault();

    // in this case, the check box is controlled by adding the .selected class
    if ($event.target) {
      $event.target.classList.toggle('selected');
    }

    switch (type) {
      case 1:
        if (
          this.selectServiceProviderTypes.length > 0 &&
          this.selectServiceProviderTypes.includes(id)
        ) {
          this.selectServiceProviderTypes =
            this.selectServiceProviderTypes.filter((ele) => {
              return ele !== id;
            });
        } else {
          this.selectServiceProviderTypes.push(id);
        }

        break;
      case 2:
        if (
          this.selectActivationStatus.length > 0 &&
          this.selectActivationStatus.includes(id)
        ) {
          this.selectActivationStatus = this.selectActivationStatus.filter(
            (ele) => {
              return ele !== id;
            }
          );
        } else {
          this.selectActivationStatus.push(id);
        }
        break;
      case 3:
        if (
          this.selectAnimalCategories.length > 0 &&
          this.selectAnimalCategories.includes(id)
        ) {
          this.selectAnimalCategories = this.selectAnimalCategories.filter(
            (ele) => {
              return ele !== id;
            }
          );
        } else {
          this.selectAnimalCategories.push(id);
        }
        break;
    }
    const filter: paramsRequest = {
      page: this.page,
      pageSize: this.pageSize,
      ServiceProviderTypes: this.selectServiceProviderTypes,
      ActivationStatus: this.selectActivationStatus,
      AnimalCategories: this.selectAnimalCategories,
      ServiceProviderId: this.numberValue,
    };

    this.getAllServiceProviders(filter);

    // add additional selection logic here.
  }
  changeNumber() {
    if (this.numberValue) {
      const filter: paramsRequest = {
        page: this.page,
        pageSize: this.pageSize,
        ServiceProviderTypes: this.selectServiceProviderTypes,
        ActivationStatus: this.selectActivationStatus,
        AnimalCategories: this.selectAnimalCategories,
        ServiceProviderId: this.numberValue,
      };

      this.getAllServiceProviders(filter);
    } else {
      const filter: paramsRequest = {
        page: this.page,
        pageSize: this.pageSize,
        ServiceProviderTypes: this.selectServiceProviderTypes,
        ActivationStatus: this.selectActivationStatus,
        AnimalCategories: this.selectAnimalCategories,
      };

      this.getAllServiceProviders(filter);
    }
  }

  handleKeyPress(e: KeyboardEvent) {
    const isDigit = /\d/.test(e.key);
    return isDigit;
  }
  trackByIdentity = (index: number, item: any) => item;

  // Color menu item click handler
}
