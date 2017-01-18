import { NgModule, ErrorHandler }     from '@angular/core';
import { ResourceModule }             from 'ng2-resource-rest';
import { CloudModule }                from '@ionic/cloud-angular';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { OAuthModule }                from 'angular-oauth2-oidc';

import { LocalStorage }               from '../common/services/local-storage';
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
    CloudModule.forRoot(AppConfig.CLOUD_SETTINGS),
    OAuthModule.forRoot(),

    ResourceModule.forRoot(),
    ProductModule.forRoot(),
    UserModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    LocalStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}