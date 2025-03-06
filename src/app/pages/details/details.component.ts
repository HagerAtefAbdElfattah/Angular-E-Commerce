import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/Product';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  id:string = '';

  productData!:Product 

  constructor(private activatedRoute:ActivatedRoute, private productsService:ProductsService, private cart:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next : (params) => {
        console.log(params)
        this.id = params.get('id') as string
        this.getSpecificProduct();
      }
    
    })
  }

  getSpecificProduct(){
    this.productsService.getSpecificProduct(this.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.productData = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  addToCart(id:string){
    this.cart.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
