import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { ProductListPage }                from './product-list/product-list';
import { ProductDetailsPage }             from './product-details/product-details';
import { ProductSearchPage }              from './product-search/product-search';

import { ProductResource }                from './product.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(ProductListPage),
    IonicModule.forRoot(ProductDetailsPage),
    IonicModule.forRoot(ProductSearchPage),
  ],
  declarations: [
    ProductListPage,
    ProductDetailsPage,
    ProductSearchPage
  ],
  exports: [
    ProductListPage,
    ProductDetailsPage,
    ProductSearchPage
  ]
})
export class ProductModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : ProductModule,
      providers : [
        ProductResource
      ]
    };
  }
}
