import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  popOverResult:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.popOverResult = this.navParams.data.data;
    console.log("来自弹出页")
    console.log(this.popOverResult);
  }

  itemTapped(e) {
    console.log(e.target);
    this.navCtrl.push(HomePage);
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(LiPage, {
    //   item: item
    // });
  }
}
