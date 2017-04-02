import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonServices } from '../service/generalservices';
import { Home } from '../home/Home';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-setPreference',
  templateUrl: 'setPreference.html',
  providers: [CommonServices]
})
export class SetPreference {
  LookUp:  Array<{CategoryTag: Array<{Id: string, CategoryNameEn: string, CategoryNameAr: string}>,
                CookingTypeTag: Array<{Id: string, CookingTypeNameEn: string, CookingTypeNameAr: string}>,
                CusineTag: Array<{Id: string, CusineNameEn: string, CusineNameAr: string}>,
                Time: Array<{Id: string, TimeEn: string, TimeAr: string}>,
                Calories: Array<{Id: string, CaloriesNameEn: string, CaloriesNameAr: string}>}>;

  MasterLookUpArray:  any;
                
  SelectedCategory: string;
  SelectedCusine: string;
  SelectedCookingType: string;
  aCategory: string;
  UserPreferedCategory: Array<string>;
  UserPreferedCusine: Array<string>;
  UserPreferedCookingType: Array<string>;

  constructor(public navCtrl: NavController,public storage:Storage,public commonServices: CommonServices, public navParams: NavParams) {
    this.aCategory = '';
    this.storage.get('IsPreserencePageSet').then((val) => { 
      if(val){
        this.navCtrl.setPages([
          {page:Home}
        ])
      }
      else{
        commonServices.GetAllLookUp().then((LookUp : any ) =>{ 
                  debugger;
           this.LookUp = [];
           this.LookUp.push(LookUp);
          //this.LookUpArray = LookUp;
          //this.MasterLookUpArray = LookUp
           //console.log(this.LookUpArray);
          //console.log(this.MasterLookUpArray);
          this.storage.set('IsPreserencePageSet', true);
          this.storage.set('FullLookUp', this.LookUp);
          
          this.aCategory = LookUp.CategoryTag[0].CategoryNameEn;
        }); 
      }
    });
  }

  SavePreference(){
    this.UserPreferedCategory = [];
    this.UserPreferedCategory.push(this.SelectedCategory)
    this.UserPreferedCusine = [];
    this.UserPreferedCusine.push(this.SelectedCusine)
    this.UserPreferedCookingType = [];
    this.UserPreferedCookingType.push(this.SelectedCookingType)
    this.storage.set('UserPreferedCategory', this.SelectedCategory);
    this.storage.set('UserPreferedCusine', this.SelectedCusine);
    this.storage.set('UserPreferedCookingType', this.SelectedCookingType);
    this.navCtrl.setPages([
      {page:Home}
    ])
  }

  test() {
    this.navCtrl.setPages([
      {page:Home}
    ])
  }
}
