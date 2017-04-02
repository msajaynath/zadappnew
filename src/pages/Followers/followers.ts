import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Profile } from '../profile/Profile';
import { GroupDetails } from '../Models/ProfileDetails';
import { UserService } from '../service/UserServices';

@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html',
  providers: [UserService]
})
export class Followers {
 Followers: Array<GroupDetails>;

 constructor(public navCtrl: NavController, public UserService: UserService, public navParams: NavParams, private app: App) {
  this.Followers = [];
  this.UserService.GetFollowersList("jkjojkdg546dg56").then((Followers : Array<GroupDetails>) =>{ 
     this.Followers = Followers;
   })
 }

 FollowersProfileClicked(event, item) {
    this.app.getRootNav().push(Profile, {
      IsViewOtherProfile: true,
      UserId : item.Id
    });
  }
}