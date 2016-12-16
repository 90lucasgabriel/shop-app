import { NgModule } 			from '@angular/core';
import { IonicModule } 			from 'ionic-angular';

import { ProductListPage } 		from './product-list/product-list';
import { ProductDetailsPage } 	from './product-details/product-details';

@NgModule({
  imports:      [ 
    IonicModule.forRoot(ProductListPage),
    IonicModule.forRoot(ProductDetailsPage)
   ],
  declarations: [
    ProductListPage,
    ProductDetailsPage
  ],
  exports: [
    ProductListPage,
    ProductDetailsPage
  ]
})
export class ProductModule {}
