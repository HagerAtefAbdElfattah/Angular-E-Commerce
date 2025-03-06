import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/interfaces/Product';

@Pipe({
  name: 'wishlistFilter'
})
export class WishlistFilterPipe implements PipeTransform {

  transform(products: Product[], wishlistIds: string[]): Product[] {
    return products.slice()
      
  }

}
