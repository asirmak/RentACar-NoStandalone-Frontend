import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from '../../services/car-image.service';
import { response } from 'express';
import { CarImage } from '../../models/carImage';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  cars: Car[];
  images: CarImage[];
  dataLoaded = false;
  filterText = "";

  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private carImageService:CarImageService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarsImagePath();
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else{
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsImagePath(){
    this.carImageService.getCarImagesByCarId().subscribe(response => {
      this.images = response.data;
      this.dataLoaded = true;
    })
  }

  getCarImage(carId: number) {
    if (!this.images || this.images.length === 0) {
      // If this.images is undefined or empty, return null
      return null;
    }
  
    const image = this.images.find(im => im.carId === carId);
    return image?.imageUrl ?? null;  // Return the image file name if found, otherwise return null
  }

  addToCart(car:Car){
    this.toastrService.success("Added to cart", car.carName);
  }
}
