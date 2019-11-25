import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { AllresultProvider } from '../providers/allresult/allresult';
import { DetailPipe } from '../pipes/detail/detail';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AllresultProvider,
    
  ]
})
export class AppModule {}

export class UserInfo {
  static loginState:string = "none";//none qq wechat
  static userName:string = "";
  static headPicUrl:string = "";
  
  static qqOpenId:string = "";
  static qqToken:string = "";
  
  static wechatOpenId:string = "";
  static wechatToken:string = "";
}