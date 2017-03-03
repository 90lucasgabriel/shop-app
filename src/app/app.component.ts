import { Component, ViewChild }    from '@angular/core';
import { Events, Nav, Platform, ModalController, MenuController }           from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LocalStorage }            from '../common/services/local-storage';
import { USER, UserService }       from '../pages/user/user.service';

import { UserLoginPage }           from '../pages/user/user-login/user-login';
import { ProductListPage }         from '../pages/product/product-list/product-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav;
  rootPage            : any    = ProductListPage;
  pages               : Array<{title: string, component: any}>;
  public userPicture  : string = 'http://knowledge-commons.com/static/assets/images/avatar.png';
  public userEmail    : string = 'Entre com sua conta';
  public userName     : string = '';

  constructor(
    public  events        : Events,
    public  platform      : Platform,
    private modalCtrl     : ModalController,
    private menuCtrl      : MenuController,
    private $localStorage : LocalStorage,
    private $user         : UserService) {
    this.initializeApp();
    this.events.subscribe('user:login', (value) =>{
      this.verifyLogin(value);
    });
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();

    });

    this.verifyLogin();

    //this.$user.verifyLogin();
    /*
    if(!this.$localStorage.get('userPicture')){
      if(this.$localStorage.get('userPicture') == 'http://knowledge-commons.com/static/assets/images/avatar.png'){
        let userPicture = 'http://knowledge-commons.com/static/assets/images/avatar.png';
        this.$localStorage.set('userPicture', userPicture);
        this.userPicture = this.$localStorage.get('userPicture');
      }
    }
    */



  }

  private verifyLogin(value?: boolean): void{

    if(this.$user.isLogged() || value){
      this.pages = [
        { title: 'Produtos', component: ProductListPage},
        { title: 'Sair',     component: null},
      ];

      this.$user.getByToken().then(
        userData =>{
          this.userEmail   = userData.email;
          this.userName    = userData.first_name + ' ' + userData.last_name==null?'':userData.last_name;
          this.userPicture = userData.picture;
        }
      );
    }
    else{
      this.pages = [
        { title: 'Products', component: ProductListPage},
      ]; 

      this.userEmail   = 'Entre com sua conta';
      this.userName    = '';
      this.userPicture = 'http://knowledge-commons.com/static/assets/images/avatar.png';
    }
  }



  //NAV ------------------------------------------------------
  public openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=='Sair'){
      this.$user.logout();
    }
    else{
      this.nav.setRoot(page.component);
    }
  }

  public goAccount(): void{
    if(this.$user.isLogged()){
      //this.nav.push(); 
      this.$user.openLogin();
    }
    else{
      this.$user.openLogin();
    }
  }

}
