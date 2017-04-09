import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController, ToastController, LoadingController} from 'ionic-angular';
import { CreateUserModel } from '../Models/createusermodel';
import { UserService } from '../service/UserServices';
import { ProfileDetails } from '../Models/ProfileDetails'
import { Storage } from '@ionic/storage';
import { Home } from '../home/Home';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LanguageService } from '../service/language';
import { Camera } from 'ionic-native';

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
  isEditing:boolean;
  resultText: any;
  s3BaseURL:String;
 awsSecret:String;
  awsKey:String;
  constructor( public loadingCtrl: LoadingController,public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public storage: Storage ,public translate: TranslateService, public language: LanguageService, public toastCtrl: ToastController, public userService: UserService, public navParams: NavParams) {
        this.s3BaseURL="https://s3.ap-south-1.amazonaws.com/zadapp/ProfileImages/";
    this.awsKey="";
    this.awsSecret="";
    this.UserInfo = navParams.get('UserInfo');
    debugger;
    this.PageTitle = navParams.get('pageName');
    this.isEditing=false;
    if (this.PageTitle == 'EditProfile') {
      this.createProfile = new CreateUserModel('','', '', this.UserInfo.Name, this.UserInfo.JobDescription, this.UserInfo.ISPrivate,
        this.UserInfo.Language, this.UserInfo.Email, this.UserInfo.PhoneNumber);
   this.isEditing=true;
   }
    else
      this.createProfile = new CreateUserModel('','', '', '', '', false, '', '', '');

    this.Languages = [];
    this.Languages.push({ LanguageId: 'ar', LanguageName: 'Arabic' });
    this.Languages.push({ LanguageId: 'en', LanguageName: 'English' });
  }

  SaveProfile() {
    let isValid = true;
    if(this.createProfile.Name.length == 0){
      this.presentToast("Please add your name");
      isValid = false
    } 
    else if(this.createProfile.JobDescription.length == 0){
      this.presentToast("Please add your Job Description");
      isValid = false
    }  
    else if(this.createProfile.Email.length == 0){
      this.presentToast("Please add your Email");
      isValid = false
    }  
    else if(!this.validateEmail(this.createProfile.Email)){
      this.presentToast("Please add correct Email");
      isValid = false
    } 
    else if(this.createProfile.PhoneNumber.length == 0){
      this.presentToast("Please add your Phone Number");
      isValid = false
    }  
    else if(!this.mobileValidation()){
      this.presentToast("Please add correct Phone number");
      isValid = false
    } 
    else if(this.createProfile.Password.length == 0&&!this.isEditing){
      this.presentToast("Please add your Password");
      isValid = false
    }  
    else if(this.createProfile.ConfirmPassword.length == 0&&!this.isEditing){
      this.presentToast("Please enter ConfirmPassword");
      isValid = false
    }    
    else if(!this.PasswordMatching()&&!this.isEditing){
      this.presentToast("Password doesnot match");
      isValid = false
    } 
    else if(this.createProfile.Language.length == 0){
      this.presentToast("Please enter Language preference");
      isValid = false
    } 
    if(isValid){
   // alert(JSON.stringify(this.createProfile));
   if(this.PageTitle == 'EditProfile')
   {
     this.storage.ready().then(() =>{
       this.storage.get('LoggedInUserId').then((userid)=>{
                this.createProfile.Id=userid;

this.userService.SaveUser(this.createProfile,'edit').then((resultText: any) => {
      this.resultText = resultText

      if (this.resultText.status == true) {
        this.storage.set('LoggedInUserId', this.resultText.id);
        this.storage.set('LoggedInUserDetails',  this.resultText);
        this.translate.use(resultText.Language);
        this.language.setValue(resultText.Language)
        this.navCtrl.setPages([
          { page: Home }
        ])
      }
      else
        alert(this.resultText.message)
    });
       });
     });
   }
   else{
    this.userService.SaveUser(this.createProfile,'signup').then((resultText: any) => {
      debugger;
      this.resultText = resultText

      if (this.resultText.status == true) {
        this.storage.set('LoggedInUserId', this.resultText.id);
        this.storage.set('LoggedInUserDetails',  this.resultText);
        this.translate.use(resultText.Language);
        this.language.setValue(resultText.Language)
        this.navCtrl.setPages([
          { page: Home }
        ])
      }
      else
        alert(this.resultText.message)
    });
  }
    }
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  PasswordMatching(){
    if(this.createProfile.Password == this.createProfile.ConfirmPassword)
      return true;
    else
      return false;
  }

  mobileValidation(){
    return /^\d{10}$/.test(this.createProfile.PhoneNumber)
  }
  ChangeImage()
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


   private takePicture(sourceType) {
    var options = {
      quality: 70,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth:150,
      targetHeight:150
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      this.uploadImage(imagePath);

    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

uploadImage(images) {
    let loading = this.loadingCtrl.create({
      content: 'Uploading image...'
    });
    loading.present();

    var AWSService = (<any>window).AWS;
    
    var buf = new Buffer(images.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    AWSService.config.accessKeyId = this.awsKey;

    AWSService.config.secretAccessKey = this.awsSecret;
    AWSService.config.signatureVersion = 'v4';
    var bucket = new AWSService.S3({ params: { Bucket: 'zadapp' } });
    var timestamp = new Date().getUTCMilliseconds();

    var params = {
      Key: "ProfileImages/" + this.UserInfo.id + ".jpeg", Body: buf, ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };

    bucket.upload(params, (err, data) => {
      loading.dismiss();
      if (err)
        this.presentToast("Error occured while uploading");
      else {
        this.presentToast("Upload successfull.");
      }
    });
  }

}
