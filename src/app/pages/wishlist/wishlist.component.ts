import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/interfaces/wishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishList: Wishlist[] = []

  constructor(private wishlistService: WishlistService, private cart: CartService, private taostr: ToastrService) {}

  ngOnInit() {
    this.getWishlist();
  }

getWishlist(){
  this.wishlistService.getWishlist().subscribe({
    next:(res)=>{
      this.wishList = res.data
      console.log(res);
      
    },error:(err)=>{
      console.log(err);
    }
  })
}

    removeFromWishlist(id:string){
    this.wishlistService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getWishlist();
        this.taostr.success(res.message, 'Success');
      },error:(err)=>{
        console.log(err);
        this.taostr.error(err.error.message, 'Error');
      }
    })
  }

addToCart(id:string){
  this.cart.addToCart(id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.cart.counter.set(res.numOfCartItems);
      this.taostr.success(res.message, 'Success');
    },error:(err)=>{
      console.log(err);
      this.taostr.error(err.error.message, 'Error');
    }
  })
}

}





