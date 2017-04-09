import { Component } from '@angular/core';
import { NavController, NavParams, App  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LanguageService } from '../service/language';
import { Home } from '../home/Home';
import { CreateProfile } from '../CreateProfile/CreateProfile';
import { UserService } from '../service/UserServices';
import { ProfileDetails } from '../Models/ProfileDetails'
import { Login } from '../login/Login';
import { SetPreference } from '../setPreference/SetPreference';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService]
})
export class Profile { 
  IsViewOtherProfile: boolean;
  profileInfo: ProfileDetails;
  userId : string;

  constructor(public navCtrl: NavController, private app: App,public translate: TranslateService, public language: LanguageService, public storage:Storage, public UserService: UserService, public navParams: NavParams) {
    this.userId = '';
    this.IsViewOtherProfile = false;
    this.IsViewOtherProfile = navParams.get("IsViewOtherProfile");
    if(this.IsViewOtherProfile){
      this.UserService.GetUserDetailsById(navParams.get("UserId")).then((profileInfo : ProfileDetails) =>{ 
        this.profileInfo = profileInfo;
        this.userId =  navParams.get("UserId");
      })  
    }
    else{
        this.storage.get('LoggedInUserId').then((val) => {   
        if(val == null){
          this.navCtrl.setPages([
            {page:Login}
          ])
        }
        else if(val.length > 0){
          this.UserService.GetUserDetailsById(val).then((profileInfo : ProfileDetails) =>{ 
            this.profileInfo = profileInfo;
            this.userId = "fdhfd";
          })    
        }
      });
    }
  }
  
  MyRecipiesList(event, item) {
    this.navCtrl.push(Home, {
      PageName: "Profile",
      ProfileId: this.userId
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.language.setValue(lang)
  }

  Logout(){
    this.storage.clear();
    this.app.getRootNav().push(SetPreference);
  }

  EditProfile(event) {
    this.navCtrl.push(CreateProfile, {
      UserInfo: this.profileInfo,
      pageName: "EditProfile"
    });
  } 
}
