import { Wishlist } from './../../core/interfaces/wishlist';
import { Component, computed, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from './../../core/services/products.service';
import { Product } from '../../core/interfaces/Product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { CommonModule } from '@angular/common'; 
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-products',
  imports: [RouterLink, CommonModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  productsList : WritableSignal<Product[]> = signal([]);

  wishList: WritableSignal<string[]> = signal([]);;

  productID: string = '';

  constructor(
    private ProductsService: ProductsService,
    private cart: CartService,
    private toastr: ToastrService,
    private wishlistService:WishlistService
  ) {  }

  ngOnInit(): void {
    this.getProducts(); 
    this.getWishlist();
    }

  getProducts() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.productInWishlist()(res.data[i]._id);
          // console.log(this.productInWishlist()(res.data[i]._id), res.data[i]._id);
        }
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
        this.toastr.success(res.message, 'Success')
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error')
      },
    });
  }

  getWishlist(){
    this.wishlistService.getWishlist().subscribe({
      next:(res)=>{
        const productIds = res.data.map((product: Wishlist) => product._id); 
        console.log(productIds);
        this.wishList.set(productIds);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  productInWishlist = computed(() => {
    return (id: string) => this.wishList().includes(id);
  });


  addToWishlist(id:string){
    this.wishlistService.addToWishlist(id).subscribe({
      next:(res)=>{
        this.wishList.set(res.data);
        this.toastr.success(`${res.message} <i class="fa-solid fa-heart"></i> `,
      'Success',{
        enableHtml: true
      });
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  removeFromWishlist(id:string){
    this.wishlistService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList.set(res.data);
        this.toastr.success(`${res.message} <i class="fa-solid fa-heart"></i> `,
      'Success',{
        enableHtml: true
      });
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  toggleFavorite(id: string) {
    this.productID = id;
    if ( this.productInWishlist()(id)) {
      this.removeFromWishlist(id);
    } else {
      this.addToWishlist(id);
    }
    
  }

}
