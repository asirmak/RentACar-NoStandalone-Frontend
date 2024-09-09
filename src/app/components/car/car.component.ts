import { Component } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  car1 = { carId: 1, carName: 'M1 SUPER SPORT', brandName: 'BMW', unitPrice: 1 }
  car2 = { carId: 2, carName: 'M2 SUPER SPORT', brandName: 'BMW', unitPrice: 2 }
  car3 = { carId: 3, carName: 'M3 SUPER SPORT', brandName: 'BMW', unitPrice: 3 }
  car4 = { carId: 4, carName: 'M4 SUPER SPORT', brandName: 'BMW', unitPrice: 4 }
  car5 = { carId: 5, carName: 'M5 SUPER SPORT', brandName: 'BMW', unitPrice: 5 }

  cars = [this.car1, this.car2, this.car3, this.car4, this.car5];
}
