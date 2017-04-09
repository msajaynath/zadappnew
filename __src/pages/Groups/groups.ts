import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { Followers } from '../followers/Followers';
import { Following } from '../following/Following';
import { Storage } from '@ionic/storage';
import { Login } from '../login/Login';

@Component({
	selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class Groups {
  tab1Root: any;
  tab2Root: any;
  LoggedInUserId : string
  constructor(public navCtrl: NavController, public storage:Storage) {
    this.LoggedInUserId = '';
    this.storage.get('LoggedInUserId').then((val) => {  
			if(val == null){
				this.navCtrl.setPages([
					{page:Login}
				])
			}
			else if(val.length > 0){
        this.LoggedInUserId = val;
        this.tab1Root = Followers;
        this.tab2Root = Following;
      }
    });
  }
}