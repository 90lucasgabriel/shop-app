import { Component }             from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';

import { LocalStorage }          from '../../../common/services/local-storage';

import { QueryInput }            from '../../../common/models/query-input';
import { User }                  from '../user.model';
import { USER, UserService }     from '../user.service';

@Component({
	  selector           : 'page-user-login',
	  templateUrl        : 'user-login.html',
	  providers          : [USER]
})
export class UserLoginPage {
  public action    : string = 'login';
  public loginData : any = {
	  username           : null,
	  password           : null,
	  passwordConfirm    : null,
  };

  public showSpinner     = false;
public messages = null;

  constructor(
	  public  navCtrl       : NavController,
	  public  viewCtrl      : ViewController,
	  public  alertCtrl     : AlertController,
	  private $localStorage : LocalStorage,
	  private $user         : UserService) {
	this.messages= this.$localStorage.get('user');
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
			}
		);
	}

	public register(data): void {
		this.showSpinner = true;

		if(data.password === data.passwordConfirm){
			this.$user.register(data).then(
				response => {
					this.login(data);
				},
				error => {
					console.log('Erro Desconhecido', error);
					this.showSpinner = false;
				}
			);
		}
		else{
			this.showSpinner = false;
			this.showAlert('Erro', 'Usuário e/ou Senha inválidos.');
		}
	}

	public loginFacebook(): void{
	  	this.$user.loginFacebook().then(
	  		login => {
	  			this.dismiss();
	  		},
	  		error => {
	  			this.showAlert('Erro', 'Login com Facebook falhou.');
	  		}
	  	);
	}

	public logoutFacebook(): void{
	  	this.$user.logoutFacebook();
	}





  //COMPONENTS ---------------------------------------------
  public dismiss() {
	this.viewCtrl.dismiss();
  }

  public showAlert(title, subtitle) {
    let alert    = this.alertCtrl.create({
      title      : title,
      subTitle   : subtitle,
      buttons    : ['OK']
    });

    alert.present();
  }






  //NAV ----------------------------------------------------
  public goProductList(): void{
  	this.navCtrl.pop();
  }




}
