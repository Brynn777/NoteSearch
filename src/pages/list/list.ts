import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  paramText:string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.paramText = this.navParams.data.data;
    console.log(this.paramText);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
