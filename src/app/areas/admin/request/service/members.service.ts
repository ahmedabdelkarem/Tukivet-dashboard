import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { paramsRequest } from '../models/params';
import { WeekDays } from 'src/enums';

@Injectable({
  providedIn: 'root',
})
export class MembersService {

  baseURL = 'https://tukivet.azurewebsites.net/api';
  constructor(private http: HttpClient) {}

  getAllServiceProviders(requestParams: paramsRequest): Observable<any> {
    let url = `${this.baseURL}/Dashboard/GetAllServiceProviders?page=${requestParams.page}`;

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
  getServiceProviderPrimaryInformation(id: any): Observable<any> {
    let url = `${this.baseURL}/Dashboard/GetServiceProviderPrimaryInformation/?ServiceProviderId=${id}`;

    return this.http.get(url);
  }
  getServiceProviderWorkingAndScientificExperience(id: any): Observable<any> {
    let url = `${this.baseURL}/Dashboard/GetServiceProviderWorkingAndScientificExperience/?ServiceProviderId=${id}`;

    return this.http.get(url);
  }
  getServiceProviderSpecialty(id: any): Observable<any> {
    let url = `${this.baseURL}/Dashboard/GetServiceProviderSpecialty/?ServiceProviderId=${id}`;

    return this.http.get(url);
  }
  getServiceProviderWorkingDetailsAndHours(id: any): Observable<any> {
    let url = `${this.baseURL}/Dashboard/GetServiceProviderWorkingDetailsAndHours/?ServiceProviderId=${id}`;

    return this.http.get(url);
  }

  updateActivationStatus(payload: any) {
    let url = `${this.baseURL}/Dashboard/UpdateActivationStatus`;
      return this.http.post(url, payload);

  }

}

