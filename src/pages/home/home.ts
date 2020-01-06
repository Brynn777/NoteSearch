import { Component } from '@angular/core';
import { NavParams,NavController,MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UserInfo } from '../../app/app.module';
import { AllresultProvider } from '../../providers/allresult/allresult';
import { PopoverController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { ListPage } from '../list/list';

// @Component下面的类是一个组件类。一个组件由一个组件Class、htmlTemplate、cssStyle
@Component({
  //metadata(元数据)就是下面的一个个选项
  selector: 'page-home',//css选择器，在父元素的html中去找
  templateUrl: 'home.html'//组件的html地址
  //styleUrl
  //providers ：使用一个 令牌 配置该指令或组件的 注入器，该令牌会映射到一个依赖项的提供商
})
export class HomePage {

  pageState:string = "loading";
  id:number = -1;
  subject:string = "mth";
  itemList:any = [];
  inPageSearchText:string = "";
  resultList:any = [];
  itemRet = [];
  positon:string = "";
  dsresult:object =[];
  picUrl:string = "";
  clickText:string;
    constructor(public imgViewerCtrl:ImageViewerController,public allresult:AllresultProvider,public menuCtrler:MenuController,public navParams: NavParams,private sanitize:DomSanitizer,public navCtrl: NavController,public popoverController: PopoverController) {
	//navParams是跳转到这个页面的路由传来的参数
    this.subject=navParams.get('subject') || "che";
	this.id=navParams.get('id') || 3;
	this.positon=navParams.get('pos') || "2";
  }

  async presentPopover(ev){ 
	this.clickText = ev.target.innerHTML;
	console.log(this.clickText);
	let popover=this.popoverController.create(ListPage,{data:this.clickText},{});

	let pos ={
		target : {
		  getBoundingClientRect : () => {
			return {
			  top: ev.target.getBoundingClientRect().y+ev.target.getBoundingClientRect().height+10,
			  left: ev.target.getBoundingClientRect().left-30
			};
		  }
		}
	};
	popover.present({ev:pos});
  }


  getDetailResultA() {
		this.getDetailResult(this.subject,this.id);
		console.log(UserInfo.loginState);
  }
  
  getDetailResult(subject:string,id:number) {
    this.pageState = "loading";
		//this.srProvider.load(subject,word).then(this.getSearchResultSuccess,this.getSearchResultError);
		this.allresult.detail(subject,id).subscribe(result => {
      		let tmpstr = JSON.stringify(result);
			if(typeof(result)!="object"){
				this.pageState="interneterror";
				return;
			}
			console.log(JSON.parse(tmpstr));
			if(JSON.parse(tmpstr).length==0){
				this.pageState="emptyresult";//impossible
			}else{
				console.log(JSON.parse(tmpstr));
				this.itemList = JSON.parse(tmpstr).detail;
				console.log(this.itemList);
				for(var i=0; i<this.itemList.son.length; i++){
					/*if(this.itemList.son[i].son == null)
						console.log("下面没了");
					else{
						for(var j=0; j<this.itemList.son[i].son.length; j++){
							
							var str1 = this.sanitize.bypassSecurityTrustHtml(this.itemList.son[i].son[j].content);
							console.log(str1);
							var str2 = str1.toString().replace(/src=\"../g, 'src=\"http://www.wingsxdu.com:1323/what5/images');
							this.itemList.son[i].son[j].content = this.sanitize.bypassSecurityTrustHtml(str2);
						}
					}*/ //新版本的库，未完成
					for(var j=0; j<this.itemList.son[i].son.length; j++){
						this.itemList.son[i].son[j].content = this.sanitize.bypassSecurityTrustHtml(this.itemList.son[i].son[j].content);
					}
				}
				console.log(this.itemList);
				this.pageState="loaded";
				if(this.positon != ""){
					this.inPageGoto(this.positon);
				}
			}
		},error => {
			this.pageState="interneterror";
    });
  }

  inPageGoto(place:string) {
		this.menuCtrler.close();
		//document.getElementsByName(place)[0].scrollIntoView({block: "start", behavior:"smooth"});
		var fc = function(){
			var obj = document.getElementsByName(place)[0];
			
			if(obj == null){
				setTimeout(fc,100);
			}else{
				obj.scrollIntoView({block: "start", behavior:"smooth"});
			}
		}
		fc();
		//window.scroll({"behavior": "smooth", "top": document.getElementsByName(place)[0].offsetTop});
  }
  
  ionViewDidLoad() {
		this.getDetailResultA();
		/*document.onclick = function($event:any){
			console.log($event);
			var maker = $event.path[0];
			if(maker.className=="detailPicHolder"){
				var e = document.createEvent('MouseEvent'); 
				e.initEvent('click', false, false); 
				var shower = document.getElementsByName("bigPicShower")[0];
				shower.dispatchEvent(e);//创建事件为了点击时 调起imgviewer,woc我好喜欢这个方法，我要修好它
				console.log(e);
				console.log(maker);
				window.onload = function(){
					var finalPic = document.getElementsByClassName("image-wrapper")[0].getElementsByClassName("image")[0].getElementsByTagName("img")[0];
				finalPic.src = maker.src;
				console.log(document.getElementsByClassName("image-wrapper")[0].lastElementChild);
				console.log(document.getElementsByName("bigPicShower"));
				console.log(document.getElementsByTagName("img")[4].src);
				}

				//var finalPic:string = document.getElementsByTagName("img")[4].getAttribute('src');
				
			}
		};*///我很喜欢你可是我救不了你
  	}
  
  	showMenu() {
		this.menuCtrler.toggle("right");
	}

	showBigPic($event){
		/*const popover = this.popoverCtrl.create(ListPage);
		popover.present();*/
		
		var maker = $event.path[0];
		if(maker.className=="detailPicHolder"){
			this.picUrl = maker.src;//获取点击图片的路径
			console.log(document.getElementsByName("bigPicShower")[0]);
			/*var a = document.getElementsByName("bigPicShower")[0];
			var e = document.createEvent('MouseEvent'); 
			e.initEvent('click', false, false); 
			a.dispatchEvent(e);*/

			setTimeout(function(){
				var a = document.getElementsByName("bigPicShower")[0];
			var e = document.createEvent('MouseEvent'); 
			e.initEvent('click', false, false); 
			a.dispatchEvent(e);
			},0)//延迟调用imageviewer
		}

	}

}
