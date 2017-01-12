import { Injectable } 		  from '@angular/core';
import 'rxjs/add/operator/map';

import { QueryInput }       from '../query-input.model';
import { User } 			    from './user.model';
import { UserResource } 	from './user.resource';


@Injectable()
export class UserService {
  private user  : User;
  private users : Array<User>;
  constructor(private userRes: UserResource) {}


  public get(id): Promise<User>{
  	return new Promise( resolve => {
  		this.userRes.get(id).$observable
  		.subscribe( data => {
  			this.user = data;
  			resolve(this.user);
  		})
  	});
  }

  public login(data): Promise<Array<User>>{
    return new Promise( resolve => {
      this.userRes.login(data).$observable
        .subscribe( data => {
          //this.users = data;
          resolve(this.users);
        })
    });
  }


}

export const USER: Array<any> = [UserResource, UserService];