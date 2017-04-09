import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { UserService } from '../service/UserServices';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LanguageService } from '../service/language';
import {Storage} from '@ionic/storage';
import { SetPreference } from '../setPreference/SetPreference';

@Component({
  selector: 'page-usersettings',
  templateUrl: 'usersettings.html',
  providers: [UserService]
})
export class UserSettings {
  ShowItem : number;
  resultText: String;
  LookUp: any;
  currentLanguage: string;
  
  constructor(public navCtrl: NavController , private app: App, public storage:Storage ,public translate: TranslateService, public language: LanguageService, public UserService: UserService, public navParams: NavParams) {
    this.currentLanguage = this.translate.currentLang;
    this.ShowItem = 1;
    this.resultText = '';
    this.storage.get('FullLookUp').then((val) => { 
      this.LookUp = val;
      this.resultText = this.LookUp[0].CategoryTag[0].CategoryNameEn;
    })
  }

  Logout(){
    this.storage.clear();
    this.app.getRootNav().push(SetPreference);
  }

  ShowItems(item){
    this.ShowItem = item;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.language.setValue(lang)
  }
}