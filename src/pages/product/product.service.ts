import { Component } 		from '@angular/core';
import { Injectable } 		from '@angular/core';
import 'rxjs/add/operator/map';

import { ProductResource } 	from './product.resource';


@Injectable()
export class ProductService {
  private data;
	
  constructor(private productRes : ProductResource) {}

  public query(){
    /*return new Promise( resolve => {
      this.productRes.query(page)
        .map(response => response.json())
        .subscribe( data => {
          this.data = data.data;
          resolve(this.data);
        })
    })*/
    console.log('service', this.productRes.query());
    return this.productRes.query();
  }

}

export const PRODUCT: Array<any> = [ProductResource, ProductService];