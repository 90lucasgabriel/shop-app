import { Injectable, Injector }     from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Observable }               from 'rxjs';

import { AppConfig }                from '../../app/app.config';
import { QueryInput }               from '../query-input.model';
import { User }                     from './user.model';


@Injectable()
@ResourceParams({
  add2Provides : false,
  url          : AppConfig.BASE_URL + 'api/clients/users'
})
export class UserResource extends Resource {

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
    path: '/login/{!data}',
    responseInterceptor: (observable: Observable<Response>): Observable<any> => {
      return observable.map(res => res.json().data);
    }
  })
  login: ResourceMethod<{data: string}, User>;
}
