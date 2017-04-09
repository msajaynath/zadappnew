import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Notifications } from '../notifications/Notifications';
import { UserSettings } from '../usersettings/UserSettings';

@Component({
	selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {
  tab1Root: any;
  tab2Root: any;
  LoggedInUserId : string
  constructor(public navCtrl: NavController) {
		this.tab1Root = Notifications;
		this.tab2Root = UserSettings;
  }
}