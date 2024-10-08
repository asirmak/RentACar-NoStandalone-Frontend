import { Component } from '@angular/core';
import { CarImageService } from '../../services/car-image.service';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarImage } from '../../models/carImage';
import { Car } from '../../models/car';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { Rental } from '../../models/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css',
})
export class RentalComponent {
  image: CarImage | undefined;
  imageUrl: string;
  car: Car | undefined;
  carRentForm: FormGroup;
  rentals : Rental[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarByCarId(params['carId']);
      this.getCarImageByCarId(params['carId']);
      this.getRentalsByCarId(params['carId']);
      this.rentCarForm();
    });
  }

  rentCarForm() {
    this.carRentForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  rentTheCar() {
    if (this.carRentForm.valid) {
      // change the customer id here !!!!
      let rental = Object.assign(
        { carId: this.car?.carId, customerId: 1 },
        this.carRentForm.value
      );
      this.rentalService.addRental(rental).subscribe({  
        next: (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(["cars"]);
        },
        error: (responseError) =>{
          if(responseError.error.StatusCode == 400 && responseError.error.Errors.length>0){
            for (let index = 0; index < responseError.error.Errors.length; index++) {
              this.toastrService.error(responseError.error.Errors[index].ErrorMessage, "Validation Error");
            }
          }
          else{
            this.toastrService.error(responseError.error.message);
          }
        }
      });
    } else {
      this.toastrService.error('Missing form');
    }
  }
  myFilter = (d: Date | null): boolean => {
    const input = d || new Date();
  
    if (this.rentals){

    
      // Geçersiz tarih aralıkları (başlangıç ve bitiş tarihleri)
      let invalidRanges = [];
      
      for (let rental of this.rentals){
        invalidRanges.push({start: new Date(rental.rentDate), end: new Date(rental.returnDate)})
      }


      // Her bir aralığı kontrol et
      for (let range of invalidRanges) {
        if (input >= range.start && input <= range.end) {
          return false; // Bu aralıktaysa tarih geçersizdir
        }
      }
    }
    // Diğer günler geçerli
    return true;
  };
  
  
  getDayDifference(): number | null {

    let rentDate = this.carRentForm.get('rentDate')?.value;
    let returnDate = this.carRentForm.get('returnDate')?.value;

    if (rentDate && returnDate){

      const rentDateObj = new Date(rentDate);
      const returnDateObj = new Date(returnDate);

      const dayDifference = (returnDateObj.getTime() - rentDateObj.getTime()) / (1000 * 60 * 60 * 24);

      return Math.floor(dayDifference);
    }
    return null;
  }

  getCarByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      const car = response.data.at(0);
      if (car) {
        this.car = car;
      } else {
        console.error('car not found!');
      }
    });
  }

  getCarImageByCarId(carId: number) {
    this.carImageService.getOneCarImageByCarId(carId).subscribe((response) => {
      const carImage = response.data.at(0);
      if (carImage) {
        this.image = carImage;
        this.imageUrl = this.image.imageUrl;
      } else {
        console.error('image not found');
      }
    });
  }

  getRentalsByCarId(carId: number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response =>{
      this.rentals = response.data;
    })
  }
}
