import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ArTranslateService {

  private renderer2 =inject(RendererFactory2).createRenderer(null, null);
  private platId   =inject(PLATFORM_ID);

  constructor(private translate: TranslateService) { 
    this.translate.setDefaultLang('en')
    const lang = localStorage.getItem('lang')
    if (lang) {
      this.translate.use(lang)
    }
    this.changeDirection()
  }

  changeDirection() {
    if (localStorage.getItem('lang') === 'en') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr')
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en')
    }else if(localStorage.getItem('lang')==='ar'){
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl')
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar')
    }
  }

  changeLang(lang:string){
    if(isPlatformBrowser(this.platId)){
      localStorage.setItem('lang'  , lang);
    }

    this.translate.use(lang);
    this.changeDirection();
}
}
