import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Home } from '../home/Home';
import { CreateProfile } from '../CreateProfile/CreateProfile';
import { UserService } from '../service/UserServices';
import { ProfileDetails } from '../Models/ProfileDetails'
import { Login } from '../login/Login';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService]
})
export class Profile { 
  IsViewOtherProfile: boolean;
  profileInfo: ProfileDetails;
  userId : string;
  options:any;
  s3BaseURL:String;
  constructor(public navCtrl: NavController, public storage:Storage, public UserService: UserService, public navParams: NavParams) {
    this.s3BaseURL="https://s3.ap-south-1.amazonaws.com/zadapp/ProfileImages/";
    this.userId = '';
    this.options = {};
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
          this.options.PageName = 'Profile';
          this.options.UserId = val;
          this.navCtrl.setPages([
            {page:Login, params: {'params': this.options}}
            ])
        }
        else if(val.length > 0){
          this.storage.get('LoggedInUserDetails').then((info) => { 
            this.profileInfo = info;
	          this.userId = info.id;
          }); 
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

  EditProfile(event) {
    this.navCtrl.push(CreateProfile, {
      UserInfo: this.profileInfo,
      pageName: "EditProfile"
    });
  } 
}
