import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { CommonServices } from '../service/generalservices';
import { RecipieService } from '../service/RecipieServices';
import { CreateRecipieModel } from '../Models/createrecipiemodel'
import { Login } from '../login/Login';

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
  LookUp: Array<{
    CategoryTag: Array<{ Id: string, CategoryNameEn: string, CategoryNameAr: string }>,
    CookingTypeTag: Array<{ Id: string, CookingTypeNameEn: string, CookingTypeNameAr: string }>,
    CusineTag: Array<{ Id: string, CusineNameEn: string, CusineNameAr: string }>,
    Time: Array<{ Id: string, TimeEn: string, TimeAr: string }>,
    Calories: Array<{ Id: string, CaloriesNameEn: string, CaloriesNameAr: string }>
  }>;
  createRecipie;


  constructor(public navCtrl: NavController, public storage: Storage, public recipieService: RecipieService, public commonServices: CommonServices, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.createRecipie = new CreateRecipieModel('', '', '', '', '', [], [], 0, '', [], '', '', '');
    this.resultText = '';
    this.storage.ready().then(() => {
      this.storage.get('LoggedInUserId').then((val) => {

        if (val == null) {
          this.navCtrl.setPages([
            { page: Login }
          ])
        }
        else if (val.length > 0) {
          this.noOfIngredents = 0;
          this.storage.get('FullLookUp').then((val) => {
            this.LookUp = val;
            this.resultText = this.LookUp[0].CategoryTag[0].CategoryNameEn;
          });
        }
      });
      this.storage.get('LoggedInUserId').then((userId) => {
        this.storage.get('LoggedInUserFirstName').then((Username) => {
          this.createRecipie.MakerId = userId;
          this.createRecipie.MakerName = Username;
          //alert(JSON.stringify(this.createRecipie));

        });
      });
    });

  }

  changeIngredents() {
    for (let i = 0; i < this.noOfIngredents; i++) {
      this.createRecipie.Ingredents.push({ ingredent: '' })
    }
  }
  AddPhotos() {
    this.createRecipie.PhotosList.push({ s3Url: "assets/Images/BeefRoast.jpg", isPrimary: true });
  }
  SaveRecipieDetails() {


    this.recipieService.SaveRecipie(this.createRecipie).then((resultCreatedText: any) => {
      debugger;
      this.resultCreatedText = resultCreatedText;

      if (this.resultCreatedText.status == true) {
        alert(this.resultCreatedText.message)

      }
      else
        alert(this.resultCreatedText.message)
    });
  }

  closeIngredent(item) {
    this.createRecipie.Ingredents.splice(item, 1);
    this.noOfIngredents = this.noOfIngredents - 1;
  }

  AddMoreSteps() {
    this.createRecipie.Directions.push({ Direction: '' });
  }

  closeSteps(i) {
    this.createRecipie.Directions.splice(i, 1);
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
      quality: 10,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: Camera.DestinationType.DATA_URL
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      this.uploadImage(imagePath);

    }, (err) => {
      this.presentToast('Error while selecting image.');
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
    ///var image="data:image/gif;base64,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";
    // var file = fileInput.target.files[0];
    var buf = new Buffer(images.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    AWSService.config.signatureVersion = 'v4';
    var bucket = new AWSService.S3({ params: { Bucket: 'zadapp' } });
    var timestamp = new Date().getUTCMilliseconds();

    var params = {
      Key: "jjh" + timestamp + ".jpeg", Body: buf, ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };

    bucket.upload(params, (err, data) => {
      loading.dismiss();
      if (err)
        this.presentToast("Error occured while uploading");
      else {
        this.presentToast("Upload successfull.");
        this.createRecipie.PhotosList.push({ s3Url: data.Location, isPrimary: true });
      }
    });
  }
}
