import { Injectable, Injector }     from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod }            from '@angular/http';
import { Observable }               from 'rxjs';

import { AppConfig }                from '../../app/app.config';
import { User }                     from './user.model';


@Injectable()
@ResourceParams({
  add2Provides : false,
  url          : AppConfig.BASE_URL + 'api/clients/users'
})
export class UserResource extends Resource {
  //private grant_type : string = 'password';

  constructor(http: Http, injector: Injector){
    super(http, injector);
  }

  @ResourceAction({
    path: '/{!id}',
    params: {'include': 'images'},
    responseInterceptor: (observable: Observable<Response>): Observable<any> => {
      return observable.map(res => res.json().data);
    }
  })
  get: ResourceMethod<{id: number}, User>;

  @ResourceAction({
      method       : RequestMethod.Post,
      url          : AppConfig.BASE_URL + "oauth/access_token",
      data         : {
        client_id     : AppConfig.OAUTH_CLIENT_ID,
        client_secret : AppConfig.OAUTH_CLIENT_SECRET,
        grant_type    : "password"
      }
    }
  )
  login: ResourceMethod<User, any>;
}
