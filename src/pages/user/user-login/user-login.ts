import { Component }                        from '@angular/core';
import { NavController }                    from 'ionic-angular';
import { Facebook,Toast  }      from 'ionic-native';
import { OAuthService }                     from 'angular-oauth2-oidc';

import { QueryInput }                       from '../../query-input.model';
import { USER, UserService }                from '../user.service';

import { ProductListPage }                  from '../../product/product-list/product-list';
import { LocalStorage }                     from '../../../common/services/local-storage';

@Component({
	  selector           : 'page-user-login',
	  templateUrl        : 'user-login.html',
	  providers          : [USER]
})
export class UserLoginPage {
  public message: string;
	public message1: any;
	public message2: any;
	public image: string;
  public  loginData: any = {
	  username           : '',
	  password           : ''
  };

  public  queryInput: QueryInput = {
	  page               : 1
  };
  public showSpinner     = false;


  constructor(
	  public  navCtrl    : NavController,
	  private $oauth     : OAuthService,
    private $localStorage : LocalStorage,
	  private $user      : UserService) {
  }


	public login(data): void {
		this.showSpinner = true;
		console.log(data);
		this.$user.login(data).then(
			response => {
				//Se possui a proprieade 'status', houve erro
				if(response.hasOwnProperty("status")){
					if(response["status"] == 401){
						console.log('loginErro', response);
					}
				}
				//Se as credenciais estiverem corretas
				else{
					console.log('login', response);
					this.goProductList();
				}
				this.showSpinner = false;
			},
			error => {
				console.log('Erro Desconhecido', error);
				this.showSpinner = false;
			});
	}

	public loginFacebook(): void{
	  	console.log("Facebook");
		
		Facebook.login(["email"])
			.then((result) => {
		        console.log(result);
		        Toast.show("I'm a toast", '5000', 'center');
		        this.message = result.status;

            	this.$localStorage.set('facebook', result);
            	this.$localStorage.set('user', "http://graph.facebook.com/"+ result.authResponse.userID +"/picture");       	
		        this.image = "http://graph.facebook.com/"+ result.authResponse.userID +"/picture";
	   		})
		
	  }



  //NAV ----------------------------------------------------
  public goProductList(): void{
  	this.navCtrl.setRoot(ProductListPage, {}, {animate:true});
  }



}
