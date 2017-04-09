import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Camera,File } from 'ionic-native';

import { Storage } from '@ionic/storage';
import { CommonServices } from '../service/generalservices';
import { RecipieService } from '../service/RecipieServices';
import { CreateRecipieModel } from '../Models/createrecipiemodel'
import { Login } from '../login/Login';
import { TranslateService } from 'ng2-translate/ng2-translate';
declare var window: any;

declare var require: any
require('aws-sdk/dist/aws-sdk');
declare var cordova: any;
declare const Buffer

@Component({
  selector: 'page-createrecipie',
  templateUrl: 'createrecipie.html',
  providers: [CommonServices, RecipieService]
})
export class CreateRecipie {
  noOfIngredents: number;
  resultCreatedText: any;
  resultText: String;
  awsSecret:String;
  awsKey:String;
  Ingredents : Array<{ingredent:string}>;
  Directions : Array<{direction:string}>;
  LookUp: Array<{
    CategoryTag: Array<{ Id: string, CategoryNameEn: string, CategoryNameAr: string }>,
    CookingTypeTag: Array<{ Id: string, CookingTypeNameEn: string, CookingTypeNameAr: string }>,
    CusineTag: Array<{ Id: string, CusineNameEn: string, CusineNameAr: string }>,
    Time: Array<{ Id: string, TimeEn: string, TimeAr: string }>,
    Calories: Array<{ Id: string, CaloriesNameEn: string, CaloriesNameAr: string }>
  }>;
  createRecipie;
  currentLanguage: string;
  options:any;

  constructor(public navCtrl: NavController,public translate: TranslateService, public storage: Storage, public recipieService: RecipieService, public commonServices: CommonServices, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
   this.awsKey="";
    this.awsSecret="";
     this.currentLanguage = this.translate.currentLang;
    this.createRecipie = new CreateRecipieModel('', '', '', '', '', [], [], 0, '', [],[], '', '', '');
    this.resultText = '';
    this.Ingredents =[];
    this.Directions =[];
    this.options = {};
    this.storage.ready().then(() => {
      this.storage.get('LoggedInUserId').then((val) => {

        if (val == null) {
          this.options.PageName = 'CreateRecipie';
          this.options.UserId = val;
          this.navCtrl.setPages([
					{page:Login, params: {'params': this.options}}
				])
        }
        else if (val.length > 0) {
          this.noOfIngredents = 0;
          this.storage.get('FullLookUp').then((val) => {
            this.LookUp = val;
            this.resultText = this.LookUp[0].CategoryTag[0].CategoryNameEn;
          });
          this.storage.get('LoggedInUserDetails').then((info) => { 
            this.createRecipie.MakerId = info.id;
          this.createRecipie.MakerName = info.Name;
          }); 
        }
      });
    });

  }

  AddIngredents() {
    this.Ingredents.push({ ingredent: '' })
  }
  AddPhotos() {
    this.createRecipie.PhotosList.push({ s3Url: "assets/Images/BeefRoast.jpg", isPrimary: true });
  }
  SaveRecipieDetails() {
    let isValid = true;
    if(this.createRecipie.RecipeName.length == 0){
      this.presentToast("Please add Recipie Name");
      isValid = false
    }
    else if(this.createRecipie.RecipeDescription.length == 0){
      this.presentToast("Please add Recipe Description");
      isValid = false
    }
    else if(this.createRecipie.Time.length == 0){
      this.presentToast("Please add Time to cook");
      isValid = false
    }
    else if(this.createRecipie.Calories.length == 0){
      this.presentToast("Please add approxmiate calorie value");
      isValid = false
    }
    else if(this.Ingredents.length == 0){
      this.presentToast("Please add atleast one ingredent");
      isValid = false
    }    
    else if(this.Directions.length == 0){
      this.presentToast("Please add atleast one Direction");
      isValid = false
    }
    else if(this.createRecipie.Category.length == 0){
      this.presentToast("Please add a Category");
      isValid = false
    }
    else if(this.createRecipie.CookingType.length == 0){
      this.presentToast("Please add Cooking Type");
      isValid = false
    }
    else if(this.createRecipie.Cusine.length == 0){
      this.presentToast("Please add Cusine");
      isValid = false
    }

    if(this.Ingredents.length > 0){
       this.createRecipie.Ingredents = [];
      for(let i = 0; i < this.Ingredents.length; i ++)
        this.createRecipie.Ingredents.push(this.Ingredents[i].ingredent);
    }

    if(this.Directions.length > 0){
      this.createRecipie.Directions = [];
      for(let i = 0; i < this.Directions.length; i ++)
        this.createRecipie.Directions.push(this.Directions[i].direction);
    }
    alert(JSON.stringify(this.createRecipie));

    this.recipieService.SaveRecipie(this.createRecipie).then((resultCreatedText: any) => {
      this.resultCreatedText = resultCreatedText;

      if (this.resultCreatedText.status == true) {
        this.presentToast(this.resultCreatedText.message)

      }
      else
         this.presentToast(this.resultCreatedText.message)
    });
  }

  closeIngredent(item) {
    this.Ingredents.splice(item, 1);
  }

  AddMoreSteps() {
    this.Directions.push({ direction: '' });
  }

  closeSteps(i) {
    this.Directions.splice(i, 1);
  }


  private presentVideoActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Video Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takeVideo(Camera.PictureSourceType.PHOTOLIBRARY);
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


   private presentActionSheet() {
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
      targetWidth:640,
      targetHeight:480
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      this.uploadImage(imagePath);

    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
public videoOptions: any = {
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: Camera.MediaType.ALLMEDIA,
      destinationType: Camera.DestinationType.FILE_URI
}

 private takeVideo(sourceType) {

/////
Camera.getPicture(this.videoOptions).then( (fileUri: any) => {
     // alert('File URI: ' + JSON.stringify(fileUri));
      window.resolveLocalFileSystemURL('file://' + fileUri, (fileEntry) => {
       // alert('Type: ' + (typeof fileEntry));
         fileEntry.file( (file) => {
         // alert('File: ' + (typeof file) + ', ' + JSON.stringify(file));
           const fileReader = new FileReader();
           
           fileReader.onloadend = (result: any) => {
           //  alert('File Reader Result: ' + JSON.stringify(result));
             let arrayBuffer = result.target.result;
             this.uploadVideo(arrayBuffer);
           };

           fileReader.onerror = (error: any) => {
             //alert(error);
           };
        fileReader.readAsArrayBuffer(file);

         });
      });
});


  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
      Key: "recipiesImages/zad_" + timestamp + ".jpeg", Body: buf, ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };

    bucket.upload(params, (err, data) => {
      loading.dismiss();
      if (err)
        this.presentToast("Error occured while uploading");
      else {
        this.presentToast("Upload successfull.");
        let imageLength=this.createRecipie.Images.length;
        this.createRecipie.Images.push({ URL: data.Location,Order:imageLength, Type: "jpeg" });
      }
    });
  }

   uploadVideo(videoBuffer) {
    let loading = this.loadingCtrl.create({
      content: 'Uploading video...'
    });
    loading.present();

    var AWSService = (<any>window).AWS;
    
   // var buf = new Buffer(images.replace(/^data:image\/\w+;base64,/, ""), 'base64')
   AWSService.config.accessKeyId = this.awsKey;

    AWSService.config.secretAccessKey = this.awsSecret;
    AWSService.config.signatureVersion = 'v4';
    var bucket = new AWSService.S3({ params: { Bucket: 'zadapp' } });
    var timestamp = new Date().getUTCMilliseconds();

    var params = {
      Key: "recipieVideos/zad_" + timestamp + ".mp4", Body: videoBuffer, //ContentEncoding: 'base64',
      ContentType: 'video/mp4'
    };

    bucket.upload(params, (err, data) => {
      loading.dismiss();
      if (err)
        this.presentToast("Error occured while uploading");
      else {
        this.presentToast("Upload successfull.");
        let videoLength=this.createRecipie.Videos.length;
        this.createRecipie.Videos.push({ URL: data.Location,Order:videoLength, Type: "video/mp4" });
      }
    });
  }
}
