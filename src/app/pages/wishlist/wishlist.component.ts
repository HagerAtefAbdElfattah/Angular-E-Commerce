import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/interfaces/wishlist';
import { Product } from '../../core/interfaces/Product';
import { ProductsService } from '../../core/services/products.service';
import { WishlistFilterPipe } from '../../shared/pipes/wishlist-filter.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, WishlistFilterPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishList: string[] = []

  allProducts: Product[] = [];

  constructor(private wishlistService: WishlistService, private productService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts();
    this.getWishlist();
  }
getAllProducts(){
  this.productService.getProducts().subscribe({
    next:(res)=>{
      this.allProducts = res.data 
      console.log(this.allProducts);
    },error:(err)=>{
      console.log(err);      
    }
  })
  
}

getWishlist(){
  this.wishlistService.getWishlist().subscribe({
    next:(res)=>{
      this.wishList = res.data
      console.log(res.data);
      const jsonString = JSON.stringify(res);  // Convert API response to JSON string
      const parsedWishlist = JSON.parse(jsonString); // Convert back to an object
      this.wishList = parsedWishlist; // Store the modified data
      
    },error:(err)=>{
      console.log(err);
    }
  })
}

    removeFromWishlist(id:string){
    this.wishlistService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        // console.log(res);
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}





