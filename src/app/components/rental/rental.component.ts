import { Component } from '@angular/core';
import { CarImageService } from '../../services/car-image.service';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarImage } from '../../models/carImage';
import { Car } from '../../models/car';
import { response } from 'express';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {
  image: CarImage | undefined;
  imageUrl: string;
  car: Car | undefined;

  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarByCarId(params["carId"]);
      this.getCarImageByCarId(params["carId"]);
    })
  }

  getCarByCarId(carId:number) {
    this.carService.getCarByCarId(carId).subscribe(response => {
      const car = response.data.at(0);
      if (car){
        this.car = car;
      }else{
        console.error("car not found!");
      }
    })
  }

  getCarImageByCarId(carId:number){
    this.carImageService.getOneCarImageByCarId(carId).subscribe(response => {
      const carImage = response.data.at(0);
      if(carImage){
        this.image = carImage;
        this.imageUrl = this.image.imageUrl;
      }
      else{
        console.error("image not found");
      }
    })
  }
}
