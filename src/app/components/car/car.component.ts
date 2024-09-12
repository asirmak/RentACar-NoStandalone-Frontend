import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarResponseModel } from '../../models/carResponseModel';
import { CarService } from '../../services/car.service';
import { response } from 'express';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded = false;
  apiUrl = 'https://localhost:44386/api/cars/getall';

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
