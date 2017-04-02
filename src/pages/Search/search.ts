import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})


export class Search {
	//searchFilter: any;
	callback: any;
	LookUp:  Array<{CategoryTag: Array<{Id: string, CategoryNameEn: string, CategoryNameAr: string, IsSelected: boolean}>,
                CookingTypeTag: Array<{Id: string, CookingTypeNameEn: string, CookingTypeNameAr: string, IsSelected: boolean}>,
                CusineTag: Array<{Id: string, CusineNameEn: string, CusineNameAr: string, IsSelected: boolean}>,
                Time: Array<{Id: string, TimeEn: string, TimeAr: string}>,
                Calories: Array<{Id: string, CaloriesNameEn: string, CaloriesNameAr: string}>}>;

	SelectedTime : string;
	SelectedCalories: string;
	SelectedCategories: string[];
	SelectedCusine: string[];
	SelectedCookingType: string[];

	SelectedList: string;
  constructor(public navCtrl: NavController, public storage:Storage, public navParams: NavParams) {
		this.SelectedList = "";
		this.storage.get('FullLookUp').then((val) => {  
			for(let  i =0; i<val[0].CategoryTag.length; i++){
				val[0].CategoryTag[i].IsSelected = false;
			}
			for(let  i =0; i<val[0].CookingTypeTag.length; i++){
				val[0].CookingTypeTag[i].IsSelected = false;
			}
			for(let  i =0; i<val[0].CusineTag.length; i++){
				val[0].CusineTag[i].IsSelected = false;
			}
			this.LookUp = val; 
			this.SelectedList = "Time";
		});
  }  

	RefineSearchSave() {
		this.SelectedCategories = [];
		this.SelectedCusine = [];
		this.SelectedCookingType = [];

		for(let  i =0; i<this.LookUp[0].CategoryTag.length; i++){
			if(this.LookUp[0].CategoryTag[i].IsSelected)
				this.SelectedCategories.push(this.LookUp[0].CategoryTag[i].Id)
		}
		for(let  i =0; i<this.LookUp[0].CookingTypeTag.length; i++){
			if(this.LookUp[0].CookingTypeTag[i].IsSelected)
				this.SelectedCusine.push(this.LookUp[0].CookingTypeTag[i].Id)
		}
		for(let  i =0; i<this.LookUp[0].CusineTag.length; i++){
			if(this.LookUp[0].CusineTag[i].IsSelected)
				this.SelectedCookingType.push(this.LookUp[0].CusineTag[i].Id)
		}

		let searchfilter = new searchFilter(this.SelectedTime,	this.SelectedCalories,	this.SelectedCategories,
																				this.SelectedCusine,	this.SelectedCookingType);

			/*this.navParams.get('showConfirm')(this.searchFilter); 
		this.navCtrl.pop();*/

		this.callback = this.navParams.get("showConfirm")

		this.callback(searchfilter).then(()=>{
				this.navCtrl.pop();
		});
		
	}

	SearchItemClick(selectedList){
		this.SelectedList = selectedList;
	}
}

export class searchFilter {
	Time :string;
	Calories :string;
	Categories : string[];
	Cusine : string[];
	CookingType : string[];
	constructor(Time: string, Calories: string, Categories:string[], Cusine: string[], CookingType: string[]) {
		this.Time = Time;
		this.Calories = Calories;
		this.Categories = Categories;
		this.Cusine = Cusine;
		this.CookingType = CookingType;
	}
}
