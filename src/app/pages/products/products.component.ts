import { Component } from '@angular/core';
import { ProductsService } from './../../core/services/products.service';
import { Product } from '../../core/interfaces/Product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/interfaces/wishlist';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-products',
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsList: Product[] = [];
  wishList:Wishlist[]=[]

  constructor(
    private ProductsService: ProductsService,
    private cart: CartService,
    private toastr: ToastrService,
    private wishlistService:WishlistService
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string) {
    this.cart.addToCart(id).subscribe({
      next: (res) => {
        this.cart.counter.set(res.numOfCartItems);
        this.wishlistService.productID.set(res.data._id);
        console.log(res);
        this.toastr.success(res.message, 'Success')
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error')
      },
    });
  }


  addToWishlist(id:string){
    this.wishlistService.addToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishlistService.allWishlist.next(res.data);
        this.toastr.success(`${res.message} <i class="fa-solid fa-heart"></i> `,
      'Success',{
        enableHtml: true
      });this.wishList = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  removeFromWishlist(id:string){
    this.wishlistService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistService.allWishlist.next(res.data);
        this.toastr.success(`${res.message} <i class="fa-solid fa-heart"></i> `,
      'Success',{
        enableHtml: true
      });this.wishList = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
}

isFavorite(id: string): boolean {
  return this.wishList.filter(product => product.id === id).length > 0;
}
toggleWishlist(id: string) {
  if (this.isFavorite(id)) {
    this.removeFromWishlist(id);
  } else {
    this.addToWishlist(id);
  }
}

}
