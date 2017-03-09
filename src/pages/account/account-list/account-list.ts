import { Component } 		            from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService }        from '../../user/user.service';

import { LocalStorage }             from '../../../common/services/local-storage';


@Component({
  selector                : 'page-account-list',
  templateUrl             : 'account-list.html',
    providers          : [UserService]
})
export class AccountListPage {
  public id               : number;
  public showSpinner      : boolean = true;

  constructor(
  	public  navCtrl       : NavController,
  	private navParams     : NavParams,
    private $localStorage : LocalStorage,
    private $user         : UserService) {
  	
  }


}
