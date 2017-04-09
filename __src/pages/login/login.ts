import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Home } from '../home/Home';
import { CreateProfile } from '../CreateProfile/CreateProfile';
import { UserService } from '../service/UserServices';
import { Network } from '@ionic-native/network';
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

  constructor(private platform: Platform,private network: Network, public navCtrl: NavController, public storage: Storage, public userServices: UserService, public navParams: NavParams) {
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

  
 Login() {
    if(this.IsNetworkAvailable==true)
   { 
      this.userServices.LoginValidation(this.email, this.password).then((LoggedInUserDetails : any) =>{ 
       this.LoggedInUserDetails = LoggedInUserDetails; 
       debugger; 
        if(this.LoggedInUserDetails.status==true){  
        this.storage.set('LoggedInUserId', this.LoggedInUserDetails.id);
         this.storage.set('LoggedInUserName',  this.LoggedInUserDetails.username);
        this.storage.set('LoggedInFirtName', this.LoggedInUserDetails.firstname);
        this.storage.set('LoggedInIsPrivate', this.LoggedInUserDetails.isprivate);
        this.storage.set('LoggedInLanguage', this.LoggedInUserDetails.language);
        this.navCtrl.setPages([
      {page:Home}])
        }      
           else
           {
 alert(this.LoggedInUserDetails.message);
           }
    });
   }
   else 
   {
      alert("No Network")
    

   }
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