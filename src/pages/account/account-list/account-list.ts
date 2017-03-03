import { Component } 		            from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User }                     from '../../user/user.model';
import { USER, UserService }        from '../../user/user.service';

import { LocalStorage }             from '../../../common/services/local-storage';


@Component({
  selector                : 'page-account-list',
  templateUrl             : 'account-list.html',
  providers               : [USER]
})
export class AccountListPage {
  public id               : number;
  public user             : User;
  public showSpinner      : boolean = true;

  constructor(
  	public  navCtrl       : NavController,
  	private navParams     : NavParams,
    private $user         : UserService,
    private $localStorage : LocalStorage) {
  	
    this.userGetByToken('abc');
  }



  public userGetByToken(token: string): void{
     

  }





  //COMPONENTS ----------------------------------------------------------
  

  //NAV ----------------------------------------------------
  /*public goProductDetails(accountId: number): void{
    this.navCtrl.push(ProductDetailsPage, {id: accountId});
  }

  public goProductSearch(): void{
    this.navCtrl.push(ProductSearchPage, {});
  }*/

}
