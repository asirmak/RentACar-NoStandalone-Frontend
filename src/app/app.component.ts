import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RentACar-NoStandalone';

  showBrand: boolean = true;

  constructor(private router: Router) {
    // Router eventlerini dinleyerek rota değişikliklerine göre `showBrand`'ı ayarlıyoruz.
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.showBrand = (event.url.startsWith('/cars/rent/') || event.url.startsWith('/login'));
      }
    });
  }

}
