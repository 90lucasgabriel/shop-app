import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { LocalStorage }                   from './local-storage';
import { AuthGuardResource }              from './auth-guard-resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(LocalStorage),
    IonicModule.forRoot(AuthGuardResource),
  ],
  declarations: [
    LocalStorage,
    AuthGuardResource,
  ],
  exports: [
    LocalStorage,
    AuthGuardResource,
  ]
})

export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : ServicesModule,
      providers : [
        LocalStorage,
        AuthGuardResource,
      ]
    };
  }
}
