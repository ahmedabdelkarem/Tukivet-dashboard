import { SelectionModel } from '@angular/cdk/collections';

import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AddNewDepartmentComponent } from './dialog/create-new-department/add-new-department.component';

export interface PeriodicElement {
  BranchAddress: string;
  Name: number;
  PhoneNumbers: string;
  Status: string;
  NoOfEmployees:number;
}

export interface DialogConfig extends MatDialogConfig {
  panelClass?: string;
  isCentered?: boolean;
  hasPadding?: boolean;
  isNewFilerDialog?: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 1, BranchAddress: 'Hydrogen', PhoneNumbers: '01094358013', Status: 'Active', NoOfEmployees: 1.0079},
  {Name: 2, BranchAddress: 'Helium', PhoneNumbers: '01094358013', Status: 'Active', NoOfEmployees: 1.0079},
  {Name: 3, BranchAddress: 'Lithium', PhoneNumbers: '01094358013', Status: 'Active', NoOfEmployees: 1.0079},
  {Name: 4, BranchAddress: 'Beryllium', PhoneNumbers: '01150026751', Status: 'Active', NoOfEmployees: 1.0079},
  {Name: 5, BranchAddress: 'Boron', PhoneNumbers: '01150026751', Status: 'Active', NoOfEmployees: 1.0079},
  {Name: 6, BranchAddress: 'Carbon', PhoneNumbers: '01150026751', Status: 'Active', NoOfEmployees: 1.0079},
  {Name: 7, BranchAddress: 'Nitrogen', PhoneNumbers: '01150026751', Status: 'Suspended', NoOfEmployees: 1.0079},

];

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent {
    displayedColumns: string[] = ['select','Name', 'Status','NoOfEmployees','reminder','sub-menu'];
dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
selection = new SelectionModel<PeriodicElement>(true, []);

constructor(private readonly matDialogService: MatDialog) {}

/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

static defaultConfig: DialogConfig = {
  disableClose: true,
  position: { right: '0px' },
  autoFocus: false,
  isCentered: false,
  hasPadding: true
};
/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: PeriodicElement): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
}

length:number=100;
pageSize:number=20;
readonly pageSizes = [5, 10, 20];

ngOnInit(): void {

}



pageChange(pageEvent:PageEvent){
  console.log(pageEvent);

}
addNewDepartment(){
  this.openDialog(AddNewDepartmentComponent,{}, {
    hasPadding: true,
    isCentered: true,
    hasBackdrop: true
  });
}

openDialog<R = any>(
  dialog: ComponentType<any>,
  dialogData?: any,
  config?: DialogConfig
): Observable<R> {
  const dialogConfig = this.composeDialogConfig(config);
  return this.matDialogService.open(dialog, {
    ...dialogConfig,
    data: { ...dialogData },
    panelClass: this.composePanelClass(dialogConfig),
  }).afterClosed();
}

openDialogRef<R>(
  dialog: ComponentType<any>,
  dialogData?: any,
  config?: DialogConfig
): MatDialogRef<R> {
  const dialogConfig = this.composeDialogConfig(config);
  const dialogRef = this.matDialogService.open(dialog, {
    ...dialogConfig,
    data: { ...dialogData },
    panelClass: this.composePanelClass(dialogConfig),
  });

  //this.addOverlayClass(dialogRef, dialogConfig.isCentered);

  return dialogRef;
}

private readonly composeDialogConfig = (
  config?: DialogConfig
): DialogConfig => ({
  hasBackdrop: !this.matDialogService.openDialogs.length,
  ...config,
});

private readonly composePanelClass = (
  config: DialogConfig
): Array<string> => {
  const panelClasses = ['ga-dialog'];

  if (!config.hasPadding) {
    panelClasses.push('ga-dialog--nopadding');
  }

  if (config.isCentered) {
    panelClasses.push('!max-h-[95vh]','!w-[780px]','');
  }

  if (config.isNewFilerDialog) {
    panelClasses.push('!h-[95vh]', '!w-[480px]', '!my-10', '!rounded-3xl');
  }

  if (config.panelClass) {
    let userAddedClasses = config.panelClass.split(' ');
    userAddedClasses = userAddedClasses.map((className) => className.trim());

    panelClasses.push(...userAddedClasses);
  }

  return panelClasses;
};


trackByIdentity = (index: number, item: any) => item;

}

