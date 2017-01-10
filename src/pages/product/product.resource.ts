import { Injectable, Injector }     from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
import { RequestMethod, Http, Request, Response }  from '@angular/http';

import { AppConfig }    from '../../app/app.config';
import { Product }      from './product.model';
import { Observable } from 'rxjs';

interface IQueryInput {
  page?     : number;
  perPage?  : number;
  dateFrom? : string;
  dateTo?   : string;
  isRead?   : string;
}

@Injectable()
@ResourceParams({
  url: 'https://randomuser.me/api/?results=10',
  add2Provides: false
  //url: AppConfig.BASE_URL + 'api/clients/products'
})
export class ProductResource extends Resource {

  constructor(http: Http, injector: Injector){
    super(http, injector);
  }

  @ResourceAction({
    isArray: true,
    responseInterceptor: (observable: Observable<Response>): Observable<any> => {
      return observable.map(res => res.json().results);
    }
  })
  query: ResourceMethod<IQueryInput, any[]>;


}
