import { Component } 		from '@angular/core';
import { NavController } 	from 'ionic-angular';
import { AppConfig } 		from '../../../app/app.config';

import { PRODUCT, ProductService } 	from '../product.service';
/*
  Generated class for the ProductList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector    : 'page-product-list',
  templateUrl : 'product-list.html',
  providers   : [PRODUCT]
})
export class ProductListPage {
  public  products;
  public  originalProducts;
  public  picture = 'http://gloimg.gearbest.com/gb/pdm-product-pic/Electronic/2016/06/17/goods-img/1476918078348098594.jpg';
  private page    = 1;


  constructor(
  	public  navCtrl    : NavController,
  	private $product   : ProductService) {
  	this.query();
  }

  public query(){
	console.log('list', this.$product.query());
  }

  public doRefresh(refresher) {
    this.page = 1;
    this.query();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  public doInfinite(infiniteScroll) {

  }

}
