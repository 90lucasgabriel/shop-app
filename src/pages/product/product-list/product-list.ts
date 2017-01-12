import { Component } 		            from '@angular/core';
import { NavController } 	          from 'ionic-angular';

import { QueryInput }               from '../../query-input.model';
import { Product }                  from '../product.model';
import { PRODUCT, ProductService }  from '../product.service';

import { ProductDetailsPage }       from '../product-details/product-details';
import { ProductSearchPage }        from '../product-search/product-search';


@Component({
  selector    : 'page-product-list',
  templateUrl : 'product-list.html',
  providers   : [PRODUCT]
})
export class ProductListPage {
  public  products    : Array<Product>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = true;




  constructor(
  	public  navCtrl    : NavController,
  	private $product   : ProductService) {
  	this.query();

  }



  public query(): void{
    this.queryInput.page = 1;
    this.products        = null;

	  this.$product.query(this.queryInput).then(
  		data => {
        this.products    = <Array<Product>> data;
        this.showSpinner = false;
  		});
  }





  //COMPONENTS ----------------------------------------------------------
  public doRefresh(refresher): void{
    this.queryInput.page = 1;
    this.query();    
    refresher.complete();
  }

  public doInfinite(infiniteScroll): void{
  	this.queryInput.page = this.queryInput.page + 1;

  	this.$product.query(this.queryInput).then(
  		data => {
  			this.products = this.products.concat(<Array<Product>> data);
  			infiniteScroll.complete();
  		}
    );  	
  }




  //NAV ----------------------------------------------------
  public goProductDetails(productId: number): void{
    this.navCtrl.push(ProductDetailsPage, {id: productId});
  }

  public goProductSearch(): void{
    this.navCtrl.push(ProductSearchPage, {});
  }

}
