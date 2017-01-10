import { Injectable, Injector }                    from '@angular/core';
import { RequestMethod, Http, Request, Response }  from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Observable }               from 'rxjs';

import { AppConfig }                from '../../app/app.config';
import { QueryInput }               from '../query-input.model';
import { Product }                  from './product.model';



@Injectable()
@ResourceParams({
  add2Provides : false,
  url          : AppConfig.BASE_URL + 'api/clients/products'
})
export class ProductResource extends Resource {

  constructor(http: Http, injector: Injector){
    super(http, injector);
  }

  @ResourceAction({
    isArray: true,
    params: {'include': 'images'},
    responseInterceptor: (observable: Observable<Response>): Observable<any> => {
      return observable.map(res => res.json().data);
    }
  })
  query: ResourceMethod<QueryInput, Array<Product>>;

  @ResourceAction({
    path: '/{!id}',
    params: {'include': 'images'},
    responseInterceptor: (observable: Observable<Response>): Observable<any> => {
      return observable.map(res => res.json().data);
    }
  })
  get: ResourceMethod<{id: number}, Product>;

  @ResourceAction({
    isArray: true,
    path: '/search/{!data}',
    params: {'include': 'images'},
    responseInterceptor: (observable: Observable<Response>): Observable<any> => {
      return observable.map(res => res.json().data);
    }
  })
  search: ResourceMethod<{data: string}, Array<Product>>;
}