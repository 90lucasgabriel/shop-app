import {Request, Response, Headers}   from '@angular/http';
import {Observable, Subscriber}       from 'rxjs';
import { LocalStorage }               from './local-storage';
import {Resource, ResourceActionBase} from 'ng2-resource-rest';


export class AuthGuardResource extends Resource {

  private deferredQ: Subscriber<any>[] = [];
  private configListenerSet: boolean = false;


  getHeaders(methodOptions: any): any {
    let headers = super.getHeaders();

    // Extending our headers with Authorization
    if (methodOptions.auth) {
      let token = JSON.parse(localStorage.getItem('token')).access_token;
      return new Headers({'Authorization': 'Bearer ' + token});
    }

    return headers;
  }

  responseInterceptor(observable: Observable<any>, request: Request, methodOptions: any): Observable<any> {

    if(!methodOptions.noPresenter){
      return observable.map(res => res.json().data);
    }

    return Observable.create((subscriber: Subscriber<any>) => {
      
        

       observable.subscribe(
        (res: Response) => {
          if (res.headers) {
            let newToken: string = res.headers.get('X-AUTH-TOKEN');
            if (newToken) {
              console.log('newToken');
              //AuthServiceHelper.token = newToken;
            }
          }
          subscriber.next((<any>res)._body ? res.json() : null);
        },
        (error: Response) => {
          if (error.status === 401) {
            console.log('401');
            localStorage.removeItem('token');
            
            //AuthServiceHelper.token = null;
          }
          console.warn('BaseResource request error', error, request);
          subscriber.error(error);
        },
        () => subscriber.complete()
      );

    });
  }

}