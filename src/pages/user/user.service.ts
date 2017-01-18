import { Injectable } 		       from '@angular/core';
import { OAuthService }          from 'angular-oauth2-oidc';
import 'rxjs/add/operator/map';

import { LocalStorage }          from '../../common/services/local-storage';

import { User } 			           from './user.model';
import { UserResource } 	       from './user.resource';


@Injectable()
export class UserService {
  private user  : User;
  //private users : Array<User>;

  constructor(
    private $oauth        : OAuthService,
    private $localStorage : LocalStorage,
    private userRes       : UserResource
  ) {}


  public get(id): Promise<User>{
  	return new Promise( resolve => {
  		this.userRes.get(id).$observable
  		.subscribe( data => {
  			this.user = data;
  			resolve(this.user);
  		})
  	});
  }

  public login(data: Object){
    return new Promise( resolve => {
      this.userRes.login(data).$observable
        .subscribe( 
          data => {
            this.$localStorage.set('token', data);
            resolve(data);
          },
          error => {
            resolve(error);
          }
        )
    });
  }


}

export const USER: Array<any> = [UserResource, UserService];