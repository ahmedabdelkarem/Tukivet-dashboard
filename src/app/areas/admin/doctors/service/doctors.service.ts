import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { paramsRequest } from '../models/params';
import { WeekDays } from 'src/enums';
import { AttachmentType } from '../models/attachment-type';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {

  baseURL = 'https://tukivet.azurewebsites.net/api';
  constructor(private http: HttpClient) { }

  getAllDoctors(requestParams: paramsRequest): Observable<any> {
    let url = `${this.baseURL}/Dashboard/GetAllDoctors?page=${requestParams.page}`;

    if (requestParams.pageSize) {
      url += `&pageSize=${requestParams.pageSize}`;
    }

    if (
      requestParams.ServiceProviderTypes &&
      requestParams.ServiceProviderTypes.length > 0
    ) {
      requestParams.ServiceProviderTypes.forEach((element) => {
        url += `&ServiceProviderTypes=${element}`;
      });
    }
    if (
      requestParams.ActivationStatus &&
      requestParams.ActivationStatus.length > 0
    ) {
      requestParams.ActivationStatus.forEach((element) => {
        url += `&ActivationStatus=${element}`;
      });
    }
    if (
      requestParams.AnimalCategories &&
      requestParams.AnimalCategories.length > 0
    ) {
      requestParams.AnimalCategories.forEach((element) => {
        url += `&AnimalCategories=${element}`;
      });
    }
    if (requestParams.ServiceProviderId) {
      url += `&ServiceProviderId=${requestParams.ServiceProviderId}`;
    }

    return this.http.get(url);
  }

  getAllFilter(): Observable<any> {
    let url = `${this.baseURL}/Dashboard/GetAllFilters`;

    return this.http.get(url);
  }
  getAllNationality(): Observable<any> {
    let url = `${this.baseURL}/Nationality/GetAllNationalities`;

    return this.http.get(url);
  }
  getAllDistrict(): Observable<any> {
    let url = `${this.baseURL}/Address/GetAllDistricts`;

    return this.http.get(url);
  }

  addDoctor(doctor: any): Observable<any> {
    let url = `${this.baseURL}/ServiceProvider/RegisterServiceProvider`;
    return this.http.post(url, doctor);

  }
  addNationalID(ServiceProviderId: any): Observable<any> {
    let url = `${this.baseURL}/ServiceProvider/UploadID`;
    return this.http.post(url, ServiceProviderId);

  }

  uploadFile(file: File, attachmentType: AttachmentType, attachmentPageType: number, newDoctorResult: any): Observable<string> {
    const formData: FormData = new FormData();

    // Ensure that the file is a Blob before appending it
    if (file instanceof Blob) {
      formData.append('file', file, file.name);
    } else {
      // If file is not a Blob, attempt to create a Blob from file data
      const blob = new Blob([file], { type: file });
      formData.append('file', blob, file);
    }

    // Add additional parameters to the formData
    formData.append('type', attachmentType.toString());
    formData.append('AttachmentType', attachmentType.toString());
    formData.append('AttachmentPageType', attachmentPageType.toString());
    formData.append('objectId', newDoctorResult);

    return this.http.post<string>('https://tukivet.azurewebsites.net/api/Attachment/AddAttachment', formData);


  }

  updateNationalID(nationalId: string, fileUrl: string, attachmentPageType: number, serviceProviderId: number | undefined): Observable<any> {
    const apiUrl = `https://tukivet.azurewebsites.net/api/ServiceProvider/UploadID?ServiceProviderId=${serviceProviderId}`;

    return this.http.post(apiUrl, { nationalId, fileUrl });
  }

  addSaveWorkExperince(data: any, attachmentPageType: number, serviceProviderId: number | undefined): Observable<any> {
    const url = `${this.baseURL}/ServiceProvider/SaveWorkExperience?ServiceProviderId=${serviceProviderId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Update content type if needed
    });

    return this.http.post(url, data, { headers });
  }

  addAnimalCategoriesAndTypes(serviceProviderId: number | undefined, requestData: any): Observable<any> {
    const apiUrl = `${this.baseURL}/ServiceProvider/AddAnimalCategoriesAndTypes?ServiceProviderId=${serviceProviderId}`;
    return this.http.post(apiUrl, requestData);
  }
  updateOtherInformation(title: string, description: string, fileUrl: string, attachmentPageType: number, serviceProviderId: number | undefined): Observable<any> {
    const apiUrl = `https://tukivet.azurewebsites.net/api/ServiceProvider/SaveOtherInfo?ServiceProviderId=${serviceProviderId}`;

    return this.http.post(apiUrl, { title, description, fileUrl });
  }
}

