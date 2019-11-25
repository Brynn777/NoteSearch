import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DetailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dsPipe',
})
export class DetailPipe implements PipeTransform {
  newGroup:any;
	transform(group: any, _keyword: string) {
		//console.log(group);

		if(_keyword.trim()=="") return group;
		var fixreg = new RegExp("([\$\(\)\*\+\.\[\?\\\^\{\|])","g");
		var keyword = _keyword.replace(fixreg,"\\$1");

		var reg = new RegExp(">[^<]*?"+ keyword +".*?<|^[^><]*$","g");
		var sonreg = new RegExp(keyword,"g");
		var tostr = "<span class='sr'>"+_keyword+"</span>";
		var sove = function(word){
			if(word.charAt(0)=='>'){
				if (word.length==2) return "><";
				return (">"+word.substring(1,word.length-1) + "<").replace(sonreg,tostr);
			}else{
				return word.replace(sonreg,tostr);
			}
		};
		var myNewObject = function(obj){
			return {
				'name':obj.name||"",
				'id':obj.id||"",
				'favor':obj.favor||"",
				'content':obj.content||"",
				'son':[]
			}
		}

		this.newGroup = myNewObject(group);
		this.newGroup.name=group.name.replace(reg, sove);
		for (var i = group.son.length - 1; i >= 0; i--) {
			this.newGroup.son[i]=myNewObject(group.son[i]);
			this.newGroup.son[i].name=group.son[i].name.replace(reg, sove);
			for (var j = group.son[i].son.length - 1; j >= 0; j--) {
				this.newGroup.son[i].son[j]=myNewObject(group.son[i].son[j]);
				this.newGroup.son[i].son[j].name=group.son[i].son[j].name.replace(reg, sove);
				this.newGroup.son[i].son[j].content=group.son[i].son[j].content.replace(reg, sove);
			}
		}
		console.log(this.newGroup);
		return this.newGroup;
	}
}
