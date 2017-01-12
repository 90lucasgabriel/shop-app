import { Injectable }       from '@angular/core';
import 'rxjs/add/operator/map';

import { QueryInput }       from '../query-input.model';
import { Product }           from './product.model';
import { ProductResource }   from './product.resource';


@Injectable()
export class ProductService {
  private product  : Product;
  private products : Array<Product>;
  constructor(private productRes: ProductResource) {}

  public query(queryInput: QueryInput): Promise<Array<Product>>{
    return new Promise( resolve => {
      this.productRes.query(queryInput).$observable
        .subscribe( data => {
          this.products = data;
          resolve(this.products);
        })
    });
  }

  public get(id): Promise<Product>{
    return new Promise( resolve => {
      this.productRes.get(id).$observable
      .subscribe( data => {
        this.product = data;
        resolve(this.product);
      })
    });
  }

  public search(data): Promise<Array<Product>>{
    return new Promise( resolve => {
      this.productRes.search(data).$observable
        .subscribe( data => {
          this.products = data;
          resolve(this.products);
        })
    });
  }


}

export const PRODUCT: Array<any> = [ProductResource, ProductService];