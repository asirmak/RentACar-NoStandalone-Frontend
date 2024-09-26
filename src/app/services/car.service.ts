import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44386/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getalldetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByCarId(carId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getdetailsbycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getalldetailsbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsBetweenDates(rentDate:string, returnDate:string): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getallcarsdetailsbyrentaldate?rentDate="+rentDate+"&returnDate="+returnDate;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
