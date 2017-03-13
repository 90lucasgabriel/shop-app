import { Component }             from '@angular/core';
import { Events, NavController, ViewController, AlertController, LoadingController } from 'ionic-angular';

import { LocalStorage }          from '../../../common/services/local-storage';

import { QueryInput }            from '../../../common/models/query-input';
import { User }                  from '../user.model';
import { UserService }           from '../user.service';

@Component({
	  selector           : 'page-user-login',
	  templateUrl        : 'user-login.html',
	  providers          : [UserService]
})
export class UserLoginPage {
  public action    : string = 'login';
  public loginData : any    = {
	  username           : null,
	  password           : null,
	  passwordConfirm    : null,
  };

  public showSpinner      = false;
  public messages         = null;

  private loader = this.loadingCtrl.create({
    content: "Aguarde...",
  });



  constructor(
		public  events        : Events,
		public  navCtrl       : NavController,
		public  viewCtrl      : ViewController,
		public  alertCtrl     : AlertController,
		public  loadingCtrl   : LoadingController,
		private $localStorage : LocalStorage,
		private $user         : UserService) {
			this.messages= this.$localStorage.get('user');
			
			//Cria o evento que verifica se o usuário está logado
			this.events.subscribe('user:login', (value) =>{
				if(value===true){
					this.loader.dismiss();
					this.dismiss();
				}
			});
  }


	public login(data): void {
		//this.showSpinner = true;
		//console.log(data);
		this.showLoading();
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
					//this.goProductList();
				}
				//this.showSpinner = false;
				this.loader.dismiss();
			},
			error => {
				console.log('Erro Desconhecido', error);
				//this.showSpinner = false;
				this.loader.dismiss();
			}
		);
	}

	public register(data): void {
		//this.showSpinner = true;
		this.showLoading();

		if(data.password === data.passwordConfirm){
			this.$user.register(data).then(
				response => {
					this.login(data);
				},
				error => {
					console.log('Erro Desconhecido', error);
					//this.showSpinner = false;
					this.loader.dismiss();
				}
			);
		}
		else{
			//this.showSpinner = false;
			this.loader.dismiss();
			this.showAlert('Erro', 'Usuário e/ou Senha inválidos.');
		}
	}

	public loginFacebook(): void{
			this.showLoading();
	  	this.$user.loginFacebook().then(
	  		login => {
	  			//this.dismiss();
	  			//console.log('logado');
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

  public showLoading() {
    this.loader.present();
  }






  //NAV ----------------------------------------------------
  public goProductList(): void{
  	this.navCtrl.pop();
  }




}