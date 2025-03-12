import { CartService } from './../../core/services/cart.service';
import { Component, computed, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ArTranslateService } from '../../core/services/ar-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() isLogin!: boolean 

  numberCounter=computed(() => {
    return this.CartService.counter()
  })

  constructor(private authService:AuthService, private CartService:CartService, private Translate:ArTranslateService) {}

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

  changeLangService(){
    const lang = localStorage.getItem('lang') === 'en' ? 'ar' : 'en' as string
    this.Translate.changeLang(lang)
  }

}
