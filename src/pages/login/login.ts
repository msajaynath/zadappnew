import { Component } from '@angular/core';
import { NavController, NavParams,Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Home } from '../home/Home';
import { CreateProfile } from '../CreateProfile/CreateProfile';
import { CreateRecipie } from '../CreateRecipie/CreateRecipie';
import { UserService } from '../service/UserServices';
import { Network } from '@ionic-native/network';
import { Profile } from '../profile/Profile';
import { Groups } from '../Groups/Groups';
import { Cookbook } from '../cookbook/Cookbook';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LanguageService } from '../service/language';

declare var navigator: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class Login {
  email: string;
  password: string;
  LoggedInUserDetails: any;
  IsNetworkAvailable: boolean;
  invokedPageDetails: any;

  constructor(private platform: Platform,private network: Network, public loadingCtrl: LoadingController, public navCtrl: NavController, public translate: TranslateService, public language: LanguageService, public storage: Storage, public userServices: UserService, public navParams: NavParams) {
   this.invokedPageDetails = navParams.get("params");
   this.platform.ready().then(() => {
    if (this.network.type == "none") {
      this.IsNetworkAvailable = false;
    }
    else {
      this.IsNetworkAvailable = true;
    }
   });
   
    this.network.onDisconnect().subscribe(() => {
      this.IsNetworkAvailable = false;
    });
    this.network.onConnect().subscribe(() => {
      this.IsNetworkAvailable = true;
    });
  }

  
 Login() 
 {
   this.storage.ready().then(()=>{

   let loading = this.loadingCtrl.create({
         spinner: 'hide',

      content: `
      <img src='assets/loading/loading.gif'>
      `
    });
   loading.present();
   if(this.IsNetworkAvailable)
   { 
      this.userServices.LoginValidation(this.email, this.password).then((LoggedInUserDetails : any) =>{ 
      this.LoggedInUserDetails = LoggedInUserDetails; 
      
      if(this.LoggedInUserDetails.status==true)
      {  
        debugger;
        
        this.storage.set('LoggedInUserId', this.LoggedInUserDetails.id);
        this.storage.set('LoggedInUserDetails',  this.LoggedInUserDetails);
        this.translate.use(this.LoggedInUserDetails.Language);
        this.language.setValue(this.LoggedInUserDetails.Language)
        var root =this;
        setTimeout(function(){
          if(root.invokedPageDetails.PageName == 'Profile')
          root.navCtrl.setPages([{page:Profile}])
        else if(root.invokedPageDetails.PageName == 'Groups')
          root.navCtrl.setPages([{page:Groups}])
        else if(root.invokedPageDetails.PageName == 'CookBook')
          root.navCtrl.setPages([{page:Cookbook}])
        else if(root.invokedPageDetails.PageName == 'CreateRecipie')
          root.navCtrl.setPages([{page:CreateRecipie}])
        else if(root.invokedPageDetails.PageName == 'Home')
          root.navCtrl.pop();
        else 
          root.navCtrl.setPages([{page:Home}])  
          loading.dismiss();
        },1000)
      }      
      else
      {
        alert(this.LoggedInUserDetails.message);
        loading.dismiss();
      }
    });
   }
   else 
   {
      alert("No Network")
      loading.dismiss();
   }
   });
 } 
    
  GoToHome(){
    this.navCtrl.setPages([
      {page:Home}
    ])    
  
  }      

createAccount(){
  this.navCtrl.push(CreateProfile, {
     UserId: '',
      page: "Create Profile"
  });
 }
}