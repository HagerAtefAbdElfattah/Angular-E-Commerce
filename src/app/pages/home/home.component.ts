import { CartService } from './../../core/services/cart.service';
import { ProductsService } from './../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Product } from '../../core/interfaces/Product';
import { Category } from '../../core/interfaces/Category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/interfaces/wishlist';



@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  productsList:Product[] = [];

  categoryList:Category[] = [];
  
  wishList:Wishlist ={} as Wishlist

  searchTerm: string = '';

  isFavorite: boolean = false

  customMainOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true,
    items: 1
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private ProductsService:ProductsService,private categoryService:CategoriesService, private CartService:CartService,
    private toastr: ToastrService, private wishlist:WishlistService) { }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.ProductsService.getProducts().subscribe({
      next:(res)=>{
        this.productsList = res.data;
      },error:(err)=>{
        console.log(err);
      }
    }
    );
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(res)=>{
        this.categoryList = res.data;
      },error:(err)=>{
        console.log(err);
      }
    }
    );
  }
  
  addToCart(id:string){
    this.CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.success(`${res.message} <i class="fa-solid fa-cart-shopping"></i> `,
      'Success',{
        enableHtml: true
      });
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  showSuccess(msg:string) {
    this.toastr.success(msg);
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


}
