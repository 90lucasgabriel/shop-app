import { Injectable } 		       from '@angular/core';
import { Token }                 from '../models/token';


@Injectable()
export class LocalStorage {
  public getValue(key, defaultValue): any{
      return localStorage[key] || defaultValue;
  }

  public setValue(key, value): any{
    localStorage[key] = value;
    return localStorage[key];
  }

  public get(key): any{
    return JSON.parse(localStorage[key] || null);
  }

  public set(key, value): any{
    localStorage[key] = JSON.stringify(value);
    return this.get(key);
  }

  public remove(key): void{
    localStorage.removeItem(key);
  }



}