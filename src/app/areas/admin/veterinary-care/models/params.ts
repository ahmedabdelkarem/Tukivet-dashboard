export interface paramsRequest {
  ServiceProviderId?: number;
  ServiceProviderTypes?: Array<number | string>;
  AnimalCategories?: Array<number | string>;
  ActivationStatus?: Array<number | string>;
  page: number;
  pageSize: number;
}
