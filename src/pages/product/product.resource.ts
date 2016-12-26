import {Injectable}     from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
import {RequestMethod}  from '@angular/http';

import { AppConfig }    from '../../app/app.config';
import { Product }      from './product.model';

interface IQueryInput {
  page?     : number;
  perPage?  : number;
  dateFrom? : string;
  dateTo?   : string;
  isRead?   : string;
}

@Injectable()
@ResourceParams({
  url: 'https://randomuser.me/api/?results=10'
  //url: AppConfig.BASE_URL + 'api/clients/products'
})
export class ProductResource extends Resource {

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<IQueryInput, any[]>;


}