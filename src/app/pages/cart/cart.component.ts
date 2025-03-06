import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../core/interfaces/Cart';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartData:Cart={} as Cart  

  cartId:string = ''
  
  constructor(private cart:CartService) { }
  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cart.getCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData = res.data
        this.cartId = res.data._id
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  removeProduct(id:string){
    this.cart.removeProduct(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  updateProduct(id:string,count:number){
    this.cart.updateProduct(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  clearCart(){
    this.cart.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData = {} as Cart
      },error:(err)=>{
        console.log(err);
      }
    })
  }

}
