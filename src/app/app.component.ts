import { Component, ViewChild }    from '@angular/core';
import { Nav, Platform }           from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { OAuthService }            from 'angular-oauth2-oidc';


import { AppConfig }               from './app.config';
import { LocalStorage }            from '../common/services/local-storage';

import { UserLoginPage }           from '../pages/user/user-login/user-login';
import { ProductListPage }         from '../pages/product/product-list/product-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav;
  rootPage            : any = ProductListPage;
  pages               : Array<{title: string, component: any}>;
  public image = this.$localStorage.get('user');

  constructor(
    public  platform     : Platform,
    private $localStorage : LocalStorage,
    private $oauth       : OAuthService) {
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login',    component: UserLoginPage},
      { title: 'Products', component: ProductListPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    
    this.$oauth.clientId = AppConfig.OAUTH_CLIENT_ID;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
