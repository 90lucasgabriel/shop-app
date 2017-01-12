import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { UserLoginPage }                  from './user-login/user-login';

import { UserResource }                   from './user.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(UserLoginPage)
  ],
  declarations: [
    UserLoginPage
  ],
  exports: [
    UserLoginPage
  ]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : UserModule,
      providers : [
        UserResource
      ]
    };
  }
}
