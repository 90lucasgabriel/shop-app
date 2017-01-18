import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { LocalStorage }                   from './local-storage';

@NgModule({
  imports:      [
    IonicModule.forRoot(LocalStorage),
  ],
  declarations: [
    LocalStorage
  ],
  exports: [
    LocalStorage
  ]
})

export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : ServicesModule,
      providers : [
        LocalStorage
      ]
    };
  }
}
