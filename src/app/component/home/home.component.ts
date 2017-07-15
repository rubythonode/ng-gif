import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {GifService} from '../../services/gif.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit ,OnChanges{
	@Input()
	mydata:string;
	search_home="";
	gif_data;
	heading="Trending";
	showGIF=false;
	constructor(private gif:GifService) { }

	ngOnInit() {
		this.search_home=this.mydata;
		this.gif_data=this.gif.getTrending().subscribe(data=>{
			this.gif_data=data.results;
		});
		let root=this;
		setTimeout(function(){
			root.showGIF=true;
		},5000);
	}
	ngOnChanges() {
		this.search_home=this.mydata;
		console.log(this.search_home);
		if(this.search_home!=undefined  && this.search_home!==""){
			console.log("here");
			this.searchgif(this.search_home);
		}
	}
	shareFB(url){
		window.open(
			'http://www.facebook.com/sharer.php?s=100&p[title]=Gif&p[summary]=Look, Its Cool &p[url]='+url,
			'facebook-share-dialog', 
			'width=626,height=436'
			); 
	}
	searchgif(item){
		this.gif.searchGIF(item)
		.subscribe(data=>{
			//console.log(data);
			this.gif_data=data.results;
			this.heading=`Your Search "${item}"`;
		});
	}
}
