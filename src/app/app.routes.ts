import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'; 

export const routes: Routes = [
    {path:"",redirectTo:"/home",pathMatch:"full"},
    {path:"", component:AuthLayoutComponent, children:[
        {path:"login",canActivate:[loggedGuard],loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent),title:"login"},
        {path:"register",canActivate:[loggedGuard],loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:"register"},
        {path:"forgetPassword",canActivate:[loggedGuard],loadComponent:()=>import('./pages/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent),title:"Forget Password"}
    ]},
    {path:"", component:MainLayoutComponent,children:[
        {path:"home",canActivate:[authGuard],loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent),title:"home"},
        {path:"cart",canActivate:[authGuard],loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent),title:"cart"},
        {path:"products",canActivate:[authGuard],loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:"products"},
        {path:"brands",canActivate:[authGuard],loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:"brands"},
        {path:"wishlist",canActivate:[authGuard],loadComponent:()=>import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent),title:"wish list"},
        {path:"categories",canActivate:[authGuard],loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent),title:"categories"},
        {path:"subCategories",canActivate:[authGuard],loadComponent:()=>import('./pages/sub-categories/sub-categories.component').then((c)=>c.SubCategoriesComponent),title:"sub-categories"},
        {path:"details/:id",canActivate:[authGuard],loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent),title:"details"},
        {path:"checkout/:id",canActivate:[authGuard],loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent),title:"checkout"},
        {path:"allorders",canActivate:[authGuard],loadComponent:()=>import('./pages/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent),title:"All Orders"},
        {path:"orderDetails/:id",canActivate:[authGuard],loadComponent:()=>import('./pages/order-details/order-details.component').then((c)=>c.OrderDetailsComponent),title:"Order Details"},

        {path:"**",loadComponent:()=>import('./pages/not-found/not-found.component').then((c)=>c.NotFoundComponent),title:"not-found"}
    ]},
];
