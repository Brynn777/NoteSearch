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
      console.log("没有登录")
      return this.http.get(
        "http://60.205.113.61:8080/What3/Points.json?action=detail&id=" + id + "&subject=" + subject
      )
    }
  }
  popOver(text:string) {
    return{
      "linkExit": true,
      "link": [
        {
          "detailId": 10086 ,//真实的detail页面id
          "anchor": 3 //锚点
        },
        {
          "detailId": 10010 ,//真实的detail页面id
          "anchor": 2 //锚点
        }
      ],
      "exampleExit": true,
      "example": [ //例题
        {
            "id": 1,
            "name": "细胞膜", // 例题标题
            "content": "/what5/examples/subject/chapter/section/7462.png" //例题图片 url
        },
        {
            "id": 3,
            "name": "核糖体",
            "content": "/what5/examples/subject/chapter/section/7462.png" //例题图片 url
        },
        {
            "id": 15,
            "name": "细胞膜",
            "content": "/what5/examples/subject/chapter/section/7462.png" //例题图片 url
        }
      ]
    }
  }

}
