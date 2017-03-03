import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { QueryInput }                     from './query-input.ts';
import { Token }                          from './token.ts';

// import { UserResource }                   from './user.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(QueryInput),
    IonicModule.forRoot(Token)
  ],
  declarations: [
    QueryInput,
    Token,
  ],
  exports: [
    QueryInput,
    Token
  ]
})
export class ModelsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : ModelsModule,
      providers : [
        // UserResource
      ]
    };
  }
}
