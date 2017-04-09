import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonServices } from '../service/generalservices';
import { Home } from '../home/Home';
import {Storage} from '@ionic/storage';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LanguageService } from '../service/language';

@Component({
  selector: 'page-setPreference',
  templateUrl: 'setPreference.html',
  providers: [CommonServices, LanguageService]
})
export class SetPreference {
  LookUp:  Array<{CategoryTag: Array<{_id: string, CategoryNameEn: string, CategoryNameAr: string,IsSelected: boolean}>,
                CookingTypeTag: Array<{_id: string, CookingTypeNameEn: string, CookingTypeNameAr: string, IsSelected: boolean}>,
                CusineTag: Array<{_id: string, CusineNameEn: string, CusineNameAr: string, IsSelected: boolean}>,
                Time: Array<{Id: string, TimeEn: string, TimeAr: string}>,
                Calories: Array<{Id: string, CaloriesNameEn: string, CaloriesNameAr: string}>}>;

  MasterLookUpArray:  any;
                
  //SelectedCategory: Array<string>;
  //SelectedCusine: Array<string>;
  //SelectedCookingType: Array<string>;
  aCategory: string;
  UserPreferedCategory: Array<string>;
  UserPreferedCusine: Array<string>;
  UserPreferedCookingType: Array<string>;
  currentLanguage: string;

  constructor(public navCtrl: NavController,public storage:Storage, public translate: TranslateService, public language: LanguageService, public commonServices: CommonServices, public navParams: NavParams) {
    this.aCategory = '';
    this.currentLanguage = this.translate.currentLang;
    if(this.currentLanguage == null || this.currentLanguage == '')
      this.currentLanguage = language.getValue();
    this.storage.get('LoggedInUserDetails').then((info) => { 
      if(info != null){
        this.translate.use(info.Language);
        this.language.setValue(info.Language)
      }
    });
    this.storage.get('IsPreserencePageSet').then((val) => { 
      if(val){
        this.navCtrl.setPages([
          {page:Home}
        ])
      }
      else{
        commonServices.GetAllLookUp().then((LookUp : any ) =>{ 
          for(let  i =0; i<LookUp.CategoryTag.length; i++){
            LookUp.CategoryTag[i].IsSelected = false;
          }
          for(let  i =0; i<LookUp.CookingTypeTag.length; i++){
            LookUp.CookingTypeTag[i].IsSelected = false;
          }
          for(let  i =0; i<LookUp.CusineTag.length; i++){
            LookUp.CusineTag[i].IsSelected = false;
          }
          this.LookUp = [];
          this.LookUp.push(LookUp);
          this.storage.set('IsPreserencePageSet', true);
          this.storage.set('FullLookUp', this.LookUp);
          this.aCategory = LookUp.CategoryTag[0].CategoryNameEn;
        }); 
      }
    });
  }

  SavePreference(){
    this.UserPreferedCategory = [];
    for(let  i =0; i<this.LookUp[0].CategoryTag.length; i++){
			if(this.LookUp[0].CategoryTag[i].IsSelected){
				this.UserPreferedCategory.push(this.LookUp[0].CategoryTag[i]._id)
      }
		}
    this.UserPreferedCookingType= [];
		for(let  i =0; i<this.LookUp[0].CookingTypeTag.length; i++){
			if(this.LookUp[0].CookingTypeTag[i].IsSelected)
				this.UserPreferedCookingType.push(this.LookUp[0].CookingTypeTag[i]._id)
		}
    this.UserPreferedCusine  = [];
		for(let  i =0; i<this.LookUp[0].CusineTag.length; i++){
			if(this.LookUp[0].CusineTag[i].IsSelected)
				this.UserPreferedCusine.push(this.LookUp[0].CusineTag[i]._id)
		}
    this.storage.ready().then(() =>{
    this.storage.set('UserPreferedCategory', this.UserPreferedCategory);
    this.storage.set('UserPreferedCusine', this.UserPreferedCusine);
    this.storage.set('UserPreferedCookingType', this.UserPreferedCookingType);
    this.navCtrl.setPages([
      {page:Home}
    ])});
  }

  // test() {
  //      this.storage.ready().then(() =>{
  //   this.storage.set('UserPreferedCategory', []);
  //   this.storage.set('UserPreferedCusine', []);
  //   this.storage.set('UserPreferedCookingType', []);
  //   this.navCtrl.setPages([
  //     {page:Home}
  //   ])});
  // }
}
