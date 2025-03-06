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
  wishList!:Wishlist;

  isFavorite: boolean = false;

  constructor(
    private ProductsService: ProductsService,
    private cart: CartService,
    private toastr: ToastrService,
    private wishlist:WishlistService
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
        console.log(res);
        this.toastr.success(res.message, 'Success');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  addToWishlist(id:string){
    this.wishlist.addToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList = res;
        this.toastr.success(`${res.message} <i class="fa-solid fa-heart"></i> `,
      'Success',{
        enableHtml: true
      });
      this.isFavorite = true;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  removeFromWishlist(id:string){
    this.wishlist.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.success(`${res.message} <i class="fa-solid fa-heart"></i> `,
      'Success',{
        enableHtml: true
      });
      this.wishList = res;
      },error:(err)=>{
        console.log(err);
      }
    })
}

toggleWishlist(id: string) {
  if (this.wishList.data.includes(id)) {
    this.removeFromWishlist(id);
  } else {
    this.addToWishlist(id);
  }
}
}
