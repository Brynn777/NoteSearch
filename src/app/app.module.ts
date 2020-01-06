
/* These are JavaScript import statements. Angular doesn’t know anything about these. */
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


//NgModule 是一个带有 @NgModule 装饰器的类
//根模块通常叫app.module
//NgModule 把组件、指令和管道打包成内聚的功能块，每个模块聚焦于一个特性区域、业务领域、工作流或通用工具。
@NgModule({
  //声明某些组件、指令和管道属于这个模块。
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPipe,
  ],
  //导入其它带有组件、指令和管道的模块，这些模块中的元件都是本模块所需的。
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageViewerModule,
  ],
  //根组件
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
  ],
  //提供一些供应用中的其它组件使用的服务
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