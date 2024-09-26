import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from '../../services/car-image.service';
import { CarImage } from '../../models/carImage';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

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
  dateFilterCarForm: FormGroup;
  dateSearchButtonClicked = false;

  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private carImageService:CarImageService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarsImagePath();
      this.carDateFilterForm();
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else{
        this.getCars();
      }
    })
  }

  carDateFilterForm() {
    this.dateFilterCarForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  myFilter = (d: Date | null): boolean => {
    const input = d || new Date();
  
    return true;
  };

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

  searchCarsBetweenDates(){

    let formattedRentDate = this.formatLocalDate(this.dateFilterCarForm.value.rentDate);
    let formattedReturnDate = this.formatLocalDate(this.dateFilterCarForm.value.returnDate);

    this.carService.getCarsBetweenDates(formattedRentDate, formattedReturnDate).subscribe(response =>{
      this.cars = this.cars.filter(c=> response.data.find(res => res.carId === c.carId));
      this.toastrService.success("Searched for the cars")
      this.dateSearchButtonClicked = true;
    })
  }

  formatLocalDate(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
