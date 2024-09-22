import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44386/api/';

  constructor(private httpClient: HttpClient) { }

  addRental(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add", rental)
  }

  getRentalsByCarId(carId:number){
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"rentals/getallbycarid?id="+carId)
  }
}
