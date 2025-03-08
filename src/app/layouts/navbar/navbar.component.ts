import { CartService } from './../../core/services/cart.service';
import { Component, computed, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() isLogin!: boolean 

  numberCounter=computed(() => {
    return this.CartService.counter()
  })

  constructor(private authService:AuthService, private CartService:CartService) {}

  ngOnInit(): void {
    this.CartService.getCart().subscribe({
      next:(res)=>{
        this.CartService.counter.set(res.numOfCartItems)
      }
    })
  }

  logout(){
    this.authService.logout()
  }

}
