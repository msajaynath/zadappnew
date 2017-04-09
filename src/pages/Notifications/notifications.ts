import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { UserService } from '../service/UserServices';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers: [UserService]
})
export class Notifications {

 constructor(public navCtrl: NavController, public UserService: UserService, public navParams: NavParams) {
  
 }
}