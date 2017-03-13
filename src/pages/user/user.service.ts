import { Injectable } 		       from '@angular/core';
import { Events, AlertController, ModalController, MenuController }       from 'ionic-angular';
import { Facebook }              from 'ionic-native';
import 'rxjs/add/operator/map';

import { Token }                 from '../../common/models/token';
import { QueryInput }            from '../../common/models/query-input';
import { LocalStorage }          from '../../common/services/local-storage';

import { User } 			           from './user.model';
import { UserResource } 	       from './user.resource';



@Injectable()
export class UserService {
  private user    : User;
  public  message : any;


  constructor(
    public  events        : Events,
    public  alertCtrl     : AlertController,
    private modalCtrl     : ModalController,
    private menuCtrl      : MenuController,
    private $localStorage : LocalStorage,
    private userRes       : UserResource
  ) {}






  //FUNCTIONS -----------------------------------------------------
  public get(id): Promise<User>{
    return new Promise<User>( 
      (resolve, reject) => {
    		this.userRes.get(id).$observable.subscribe( 
          getData => {
      			resolve(getData);
    		  },
          getError => {
            reject(getError);
          }
        )
  	  }
    );
  }

  public register(user: User): Promise<User>{
    return new Promise( resolve => {
      this.userRes.register(user).$observable.subscribe( 
        registerData => {
          if(registerData){
            user.username = registerData.email;
            user.picture  = registerData.picture;
          }
          this.login(user);
          resolve(user);
        },
        registerDataError => {
          this.showAlert('registerDataError', registerDataError);
        }
      )
    }); 
  }

  public login(data: User): Promise<Object>{
    return new Promise( resolve => {
      this.userRes.login(data).$observable
        .subscribe( 
          loginData => {
            console.log('loginData', loginData);
            console.log('loginData2', data);
            this.$localStorage.set('token', loginData);
            this.events.publish('user:login', true);
            //resolve(loginData);
          },
          loginDataError => {
            console.log('loginDataError', loginDataError);
            //this.showAlert('LoginError', JSON.stringify(loginDataError));
            this.showAlert('Erro', 'Usuário e/ou senha inválidos.');
            //resolve(loginDataError);
          }
        )
    });
  }

  public logout(): void {
    this.$localStorage.remove('token');
    this.events.publish('user:login', false);
  }

  private getToken(): Token{
    return this.$localStorage.get('token');
  } 

  public getByToken(): Promise<User>{
    //this.userRes.setHeaders('Bearer ' + this.getToken());
    return new Promise<User>(
      (resolve, reject) => {
        this.userRes.user().$observable.subscribe(
          userData => {
            resolve(userData);
          },
          userError => {
            this.refreshToken();
            reject(userError);
            console.log('userError', userError);
          }
        );
      }
    );
      
  } 

  public refreshToken(): void{

  }

  public isLogged(): boolean{
    if(this.getToken()){
      return true;
    }
    else{
      return false;
    }
  }






  //SOCIAL --------------------------------------------------------
  public loginFacebook(): Promise<boolean>{
    return new Promise( resolve => {
      this.facebookLoginStatus(resolve);
    });
  }








  //FACEBOOK -----------------------------------------------------
  //Verifica se o usuário já está conectado
  private facebookLoginStatus(resolve): void {
    Facebook.getLoginStatus().then(
        statusData => {
          if(statusData.status != "connected"){
            this.facebookLoginRegister();
          }
          else{
            this.facebookAccessToken();
          }
          resolve(true);
        }
      );
  }

  //Inicia o login e verifica se o usuário já existe na base
  private facebookLoginRegister(): void{
    Facebook.login(["public_profile","email"]).then(
      loginData => {
        this.findLocalByToken('facebook', loginData.authResponse.accessToken);
      },
      loginDataError => {
        this.showAlert('LoginDataError', loginDataError);
      }
    );
  }

  //Se já existe na base, receber o token do Facebook
  private facebookAccessToken(): void{
    Facebook.getAccessToken().then(
      tokenData => {
        this.findLocalByToken('facebook', tokenData);  
      },
      tokenDataError => {
        this.showAlert('tokenDataError', tokenDataError);
      }
    );
  }

  //Se existir, fazer login; Senão, pesquisar no Facebook com o token;
  private findLocalByToken(social: string, token: string): void{
    this.userRes.findLocalByToken({social: social, token: token}).$observable.subscribe(
      localData      => {
        let userData: Object = {
          social       : social,
          social_token : token,
          username     : localData.email
        }
        console.log('localData', userData);
        this.login(userData);
      },
      localDataError => {
        this.findSocialByToken(social, token);
      }
    );
  }

  //Se encontrar no Facebook com o token, registrar na base.
  private findSocialByToken(social: string, token: string): void{
    this.userRes.findSocialByToken({social: social, token: token}).$observable.subscribe(
      socialData      => {
        let data = {
          social       : social,
          social_token : token
        };
        this.register(data);        
      },
      socialDataError => {
        this.showAlert('socialDataError', socialDataError);
      }
    );
  }

  //Sair do Facebook
  public logoutFacebook(): void{
    Facebook.logout().then(
      result => {
        this.$localStorage.remove('facebook');
        console.log("logoutFacebook", result);
        return result;
      }
    );
  }






  //COMPONENTS ----------------------------------------------------
  public showAlert(title, subtitle): void{
    let alert    = this.alertCtrl.create({
      title      : title,
      subTitle   : subtitle,
      buttons    : ['OK']
    });

    alert.present();
  }


}
