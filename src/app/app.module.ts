import { NgModule, ErrorHandler } from '@angular/core';
import { ResourceModule }         from 'ng2-resource-rest';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { ProductModule }          from '../pages/product/product.module';

import { MyApp }                  from './app.component';




@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ResourceModule.forRoot(),
    ProductModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
