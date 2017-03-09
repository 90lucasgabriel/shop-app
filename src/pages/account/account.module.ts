import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { AccountListPage }                from './account-list/account-list';

import { UserResource }                   from '../user/user.resource';

@NgModule({ 
  imports:      [
    IonicModule.forRoot(AccountListPage),
  ],
  declarations: [
    AccountListPage,
  ],
  exports: [
    AccountListPage,
  ]
})
export class AccountModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : AccountModule,
      providers : [
        
      ]      
    };
  }
}
