import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit{

  brands: Brand[];
  currentBrand :Brand | null;
  dataLoaded = false;

  constructor(private brandService:BrandService){}
  
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
      this.dataLoaded = true;
    })
  }
  setCurrentBrand(brand?:Brand){

    if (brand == null){
      this.currentBrand = null;
    }
    else{
      this.currentBrand = brand;
    }
  }

  getCurrentBrandClass(brand?:Brand){
    // check brand if null or not, to proivde list all brands
    if (brand == null){
      if(this.currentBrand == null){
        return "list-group-item active";
      }
      else return "list-group-item";
    }
    else{
      if (brand == this.currentBrand) return "list-group-item active";
      else return "list-group-item";
    }
  }
}
