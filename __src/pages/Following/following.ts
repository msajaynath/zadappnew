import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Profile } from '../profile/Profile';
import { GroupDetails } from '../Models/ProfileDetails';
import { UserService } from '../service/UserServices';

@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
  providers: [UserService]
})
export class Following {
  
 Followings: Array<GroupDetails>;

 constructor(public navCtrl: NavController, public UserService: UserService, public navParams: NavParams, private app: App) {
  this.Followings = [];
  this.UserService.GetFollowingList("jkjojkdg546dg56").then((Followings : Array<GroupDetails>) =>{ 
     this.Followings = Followings;
   })
 }

 FollowingProfileClicked(event, item) {
    this.app.getRootNav().push(Profile, {
       IsViewOtherProfile: true,
       UserId : item.Id
    });
  }
}