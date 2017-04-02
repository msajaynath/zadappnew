import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Storage } from '@ionic/storage';

import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { RecipieDetails } from '../recipiedetails/RecipieDetails';
import { FavouriteList } from '../favouritelist/FavouriteList'
import { Search } from '../search/Search'
import { Recipies } from '../Models/RecipieDetailsmodel'
import { Profile } from '../profile/Profile';
import { RecipieService } from '../service/RecipieServices';
import { Login } from '../login/Login';
import { UserService } from '../service/UserServices';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RecipieService, UserService]
})
export class Home {
  Recipies: Array<Recipies>;
	pageName:string;
	categoryId: string;
	CookBookId: string;
	IsSearchClicked: boolean;
	ProfileId : string;
	LikedMsg : string

  constructor(public navCtrl: NavController,public recipieService: RecipieService, public UserService: UserService, public storage:Storage, public navParams: NavParams, public popoverCtrl: PopoverController, public translate: TranslateService) {
		this.IsSearchClicked = false;
		this.pageName = navParams.get("PageName");
		if(this.pageName == "Categories"){
			this.categoryId = navParams.get("categoryId");
			this.Recipies = [];
			this.recipieService.GetAllRecipiesByCategoryId(this.categoryId).then((Recipies :Array<Recipies> ) =>{ 
				this.Recipies = Recipies;
			});
			
		}
		else if(this.pageName == "CookBook"){
			this.CookBookId = navParams.get("CookBookId");
			this.Recipies = [];
			this.recipieService.GetAllRecipiesByCookBookId(this.CookBookId).then((Recipies :Array<Recipies> ) =>{ 
				this.Recipies = Recipies;
			});
		}
		else if(this.pageName == "Profile"){
			this.ProfileId = navParams.get("ProfileId");
			this.Recipies = [];	
			this.recipieService.GetAllRecipiesByUserId(this.ProfileId).then((Recipies :Array<Recipies> ) =>{ 
				this.Recipies = Recipies;
			});
		}
		else{
			this.Recipies = [];
			this.storage.get('UserPreferedCategory').then((catVal) => { 
				this.storage.get('UserPreferedCusine').then((cusineVal) => { 
					this.storage.get('UserPreferedCookingType').then((cookVal) => {
						this.recipieService.GetAllRecipies(catVal, cusineVal, cookVal, '', '').then((Recipies :Array<Recipies> ) =>{ 
							this.Recipies = Recipies;
						});
					})
				})
			})
		}
  } 

	doInfinite(infiniteScroll) {
			this.storage.get('UserPreferedCategory').then((catVal) => { 
				this.storage.get('UserPreferedCusine').then((cusineVal) => { 
					this.storage.get('UserPreferedCookingType').then((cookVal) => {
						this.recipieService.GetAllRecipies(catVal, cusineVal, cookVal, '', '').then((Recipies :Array<Recipies> ) =>{ 
							for (var i = 0; i < Recipies.length; i++) {
								this.Recipies.push( Recipies[i] );
							}
							infiniteScroll.complete();
						});
					})
				})
			})
  }

	itemTapped(event, item) {
    this.navCtrl.push(RecipieDetails, {
      RecipieId: item
    });
  }

	LikeRecipie(RecipieId){
		alert(RecipieId);
		this.storage.get('LoggedInUserId').then((val) => {   
			if(val == null){
				this.navCtrl.setPages([
					{page:Login}
				])
			}
			else if(val.length > 0){
				this.UserService.LikeRecipie(val, RecipieId).then((LikedMsg : string) =>{
					this.LikedMsg = LikedMsg;
				})    
			}
		});
	}

  presentPopover() {
		this.storage.get('LoggedInUserId').then((val) => {   
			if(val == null){
				this.navCtrl.setPages([
					{page:Login}
				])
			}
			else if(val.length > 0){
				let popover = this.popoverCtrl.create(FavouriteList);
				popover.present();
			}
		});
  }

	RecipieOwnerClick(event, profileId) {
    this.navCtrl.push(Profile, {
       IsViewOtherProfile: true,
       UserId : profileId
    });
  }

	myCallbackFunction = (params) => {
     return new Promise((resolve, reject) => {
			 alert(JSON.stringify(params));
			 this.Recipies = [];
				this.recipieService.GetAllRecipies(params.Categories, params.Cusine, params.CookingType, params.Time, params.Calories).then((Recipies :Array<Recipies> ) =>{ 
					this.Recipies = Recipies;
				});
				resolve();
     });
	}

	GetPrimaryImage(ImageURLs){
		for(let i =0; i<ImageURLs.length; i++ ){
			if(ImageURLs[i].isPrimary)
				return ImageURLs[i].s3Url
		}
	}

  RefineSearchPopover() {
    this.navCtrl.push(Search, {
        showConfirm: this.myCallbackFunction
    });
  }

	SearchClick(){
		this.IsSearchClicked = true;
	}

	onCancel(){
		this.IsSearchClicked = false;
	}
}
