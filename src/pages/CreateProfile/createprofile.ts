import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateUserModel } from '../Models/createusermodel';
import { UserService } from '../service/UserServices';
import { ProfileDetails } from '../Models/ProfileDetails'
import { Storage } from '@ionic/storage';
import { Home } from '../home/Home';

@Component({
  selector: 'page-createprofile',
  templateUrl: 'createprofile.html',
  providers: [UserService]
})
export class CreateProfile {
  UserInfo: ProfileDetails;
  PageTitle: any;
  Languages: Array<{ LanguageId: string, LanguageName: string }>;
  createProfile;

  resultText: any;

  constructor(public navCtrl: NavController, public storage: Storage, public userService: UserService, public navParams: NavParams) {
    this.UserInfo = navParams.get('UserInfo');
    this.PageTitle = navParams.get('pageName');
    if (this.PageTitle == 'EditProfile') {
      this.createProfile = new CreateUserModel('', '', this.UserInfo.FirstName, this.UserInfo.JobDescription, this.UserInfo.ISPrivate,
        this.UserInfo.Language, this.UserInfo.Email, this.UserInfo.PhoneNumber);
    }
    else
      this.createProfile = new CreateUserModel('', '', '', '', false, '', '', '');

    this.Languages = [];
    this.Languages.push({ LanguageId: 'ar', LanguageName: 'Arabic' });
    this.Languages.push({ LanguageId: 'en', LanguageName: 'English' });
  }

  SaveProfile() {
    // alert(JSON.stringify(this.createProfile));
    this.userService.SaveUser(this.createProfile).then((resultText: any) => {
      debugger;
      this.resultText = resultText

      if (this.resultText.status == true) {
        this.storage.set('LoggedInUserId', this.resultText.id);
        this.storage.set('LoggedInUserName', this.resultText.username);
        this.storage.set('LoggedInEmail', this.resultText.email);
        this.storage.set('LoggedInUserIsPrivate', this.resultText.isprivate);
        this.storage.set('LoggedInUserFirstName', this.resultText.firstname);
        this.navCtrl.setPages([
          { page: Home }
        ])
      }
      else
        alert(this.resultText.message)
    });
    // alert(this.resultText);

  }
}
