import { Component } 					        from '@angular/core';
import { NavController, NavParams } 	from 'ionic-angular';

import { Product }                  	from '../product.model';
import { PRODUCT, ProductService }  	from '../product.service';

@Component({
  selector    : 'page-product-details',
  templateUrl : 'product-details.html',
  providers   : [PRODUCT]
})
export class ProductDetailsPage {
  public id         : number;
  public product    : Product; 
  public showSpinner= true;
  public pictures   : Array<Object>;

  constructor(
  public  navCtrl   : NavController,
  private navParams : NavParams,
  private $product  : ProductService) {

  	this.id = navParams.get('id');
  	this.get(this.id);
  }  



  public get(id: number): void{
    let params : Object = {
      include : 'images',
      id      : id
    }

    this.$product.get(params).then(
      data => {
        this.product     = <Product> data;
        this.pictures    = this.product.images.data;
        this.showSpinner = false;
      });
    
  }





  // COMPONENTS -------------------------------------------


}
