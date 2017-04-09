import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LanguageService } from '../pages/service/language';

import { Home } from '../pages/home/Home';
import { Cookbook } from '../pages/cookbook/Cookbook';
import { Profile } from '../pages/profile/Profile';
import { Shoppinglist } from '../pages/shoppingList/Shoppinglist';
import { Categories } from '../pages/categories/Categories';
import { CreateRecipie } from '../pages/CreateRecipie/CreateRecipie';
import { Groups } from '../pages/Groups/Groups';
import { SetPreference } from '../pages/setPreference/SetPreference';
import { Settings } from '../pages/settings/Settings';

@Component({
  templateUrl: 'app.html',
  providers: [LanguageService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SetPreference;

  pages: Array<{title: string, component: any, icon:string}>;

  constructor(public platform: Platform, public translate: TranslateService, public language: LanguageService) {
    this.initializeApp();    
    translate.setDefaultLang(language.getValue());

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home, icon:'<i class="fa fa-home" aria-hidden="true"></i>' },
      { title: 'Categories', component: Categories, icon:'<i class="fa fa-cutlery" aria-hidden="true"></i>' },
      { title: 'My Cookbook', component: Cookbook, icon:'<i class="fa fa-book" aria-hidden="true"></i>' },
      { title: 'My Profile', component: Profile, icon:'<i class="fa fa-user" aria-hidden="true"></i>' },
      { title: 'Shopping List', component: Shoppinglist, icon:'<i class="fa fa-shopping-basket" aria-hidden="true"></i>' },
      { title: 'Create Recipe', component: CreateRecipie, icon:'<i class="fa fa-plus-circle" aria-hidden="true"></i>' },
      { title: 'Groups', component: Groups, icon:'<i class="fa fa-users" aria-hidden="true"></i>' },
      { title: 'Settings', component: Settings, icon:'<i class="fa fa-cog" aria-hidden="true"></i>' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
