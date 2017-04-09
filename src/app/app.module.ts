import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { Home } from '../pages/home/Home';
import { Followers } from '../pages/followers/Followers';
import { Following } from '../pages/following/Following';
import { Cookbook } from '../pages/cookbook/Cookbook';
import { Profile } from '../pages/profile/Profile';
import { Shoppinglist } from '../pages/shoppingList/Shoppinglist';
import { RecipieDetails } from '../pages/recipiedetails/RecipieDetails';
import { Categories } from '../pages/categories/Categories';
import { CreateProfile } from '../pages/CreateProfile/CreateProfile';
import { CreateRecipie } from '../pages/CreateRecipie/CreateRecipie';
import { Groups } from '../pages/Groups/Groups';
import { FavouriteList } from '../pages/favouritelist/FavouriteList'
import { Search } from '../pages/search/Search'
import { Login } from '../pages/login/Login';
import { SetPreference } from '../pages/setPreference/SetPreference';
import { Settings } from '../pages/settings/Settings';
import { Notifications } from '../pages/notifications/Notifications';
import { UserSettings } from '../pages/usersettings/UserSettings';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Home,
    Followers,
    Following,
    Cookbook,
    Profile,
    Shoppinglist,
    RecipieDetails,
    Categories,
    CreateRecipie,
    CreateProfile,
    Groups,
    FavouriteList,
    Search,
    Login,
    SetPreference,
    Settings,
    Notifications,
    UserSettings
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsPlacement:'top'}),
    Ionic2RatingModule,
    IonicImageViewerModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Followers,
    Following,
    Cookbook,
    Profile,
    Shoppinglist,
    RecipieDetails,
    Categories,
    CreateRecipie,
    CreateProfile,
    Groups,
    FavouriteList,
    Search,
    Login,
    SetPreference,
    Settings,
    UserSettings,
    Notifications
  ],
  providers: [Storage, {provide: ErrorHandler, useClass: IonicErrorHandler},Network]
})
export class AppModule {}
