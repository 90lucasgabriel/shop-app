import { NgModule, ModuleWithProviders }            from '@angular/core';
import { IonicModule } 			    from 'ionic-angular';

import { ProductListPage } 		  from './product-list/product-list';
import { ProductDetailsPage } 	from './product-details/product-details';
import { ProductService }       from './product.service';
import { ProductResource }      from './product.resource';

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
export class ProductModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProductModule,
      providers: [
        ProductResource
      ]
    };
  }
}
