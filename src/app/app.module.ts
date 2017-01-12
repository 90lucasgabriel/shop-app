import { NgModule, ErrorHandler }     from '@angular/core';
import { ResourceModule }             from 'ng2-resource-rest';
import { CloudModule } from '@ionic/cloud-angular';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { ProductModule }              from '../pages/product/product.module';
import { UserModule }                 from '../pages/user/user.module';

import { AppConfig }                  from './app.config';
import { MyApp }                      from './app.component';




@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ResourceModule.forRoot(),
    ProductModule.forRoot(),
    UserModule.forRoot(),
    CloudModule.forRoot(AppConfig.cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}