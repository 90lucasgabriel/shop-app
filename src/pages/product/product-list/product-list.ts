import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppConfig } from '../../../app/app.config'

/*
  Generated class for the ProductList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html'
})
export class ProductListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ProductListPage Page');
    console.log(AppConfig.BASE_URL);
  }

}
