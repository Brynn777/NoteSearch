import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../../app/app.module';

/*
  Generated class for the AllresultProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AllresultProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AllresultProvider Provider');
  }

  detail(subject:string,id:number) {
    console.log("提供了detail页信息" + subject + " " + id);
   
    if(UserInfo.loginState == "qq"){
      return this.http.get(
        "http://60.205.113.61:8080/What3/Points.json?action=detail&id=" + id + "&subject=" + subject + "&up=" + UserInfo.loginState + "&uid=" + UserInfo.qqOpenId + "&utoken=" + UserInfo.qqToken
      )
    }
    else if(UserInfo.loginState == "wechat"){
      return this.http.get(
        "http://60.205.113.61:8080/What3/Points.json?action=detail&id=" + id + "&subject=" + subject + "&up=" + UserInfo.loginState + "&uid=" + UserInfo.wechatOpenId + "&utoken=" + UserInfo.wechatToken
      )
    }else{
      return this.http.get(
        "http://60.205.113.61:8080/What3/Points.json?action=detail&id=" + id + "&subject=" + subject
      )
    }
  }

}
