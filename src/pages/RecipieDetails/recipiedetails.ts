import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoPlayer } from '@ionic-native/video-player';
import {Storage} from '@ionic/storage';

import { Profile } from '../profile/Profile';
import { RecipieService } from '../service/RecipieServices';
import { CommonServices } from '../service/generalservices';
import { RecipieDetailsModel } from '../Models/RecipieDetailsmodel'
import { Review } from '../Models/RecipieDetailsmodel'

@Component({
  selector: 'page-recipiedetails',
  templateUrl: 'recipiedetails.html',
  providers: [CommonServices, RecipieService, VideoPlayer]
})
export class RecipieDetails {
  subDirection: any;                  
  directions: Array<{subDirection: any}>;
  ButtonContent : string;
  directionStyle : string;
  primaryImage : string;
  recipieDetails : RecipieDetailsModel;
  ShowItem : number;
  IsAddNewRecipie: boolean;
  addReview;
  RecipieId: string;
  
  constructor(public navCtrl: NavController,public storage:Storage, private videoPlayer: VideoPlayer, public recipieService: RecipieService, public navParams: NavParams) {
    this.RecipieId = navParams.get("RecipieId");
    this.primaryImage = "";
    this.directionStyle = "hideContent";
    this.ButtonContent = "Show Directions";
    this.ShowItem = 1;
    this.IsAddNewRecipie = false;
    this.addReview = new Review('',	'',	0, '','');
    this.recipieService.GetRecipieDetailsById(this.RecipieId).then((recipieDetails : RecipieDetailsModel) =>{ 
      this.recipieDetails = recipieDetails;
     
      this.directions = [];
      for(let i=0; i<this.recipieDetails.Directions.length;i++)
      {
        if(this.recipieDetails.Directions[i].includes("\n"))
        {
          this.subDirection = [];
          var step = this.recipieDetails.Directions[i].split("\n");
          for(let j=0; j<step.length;j++){
            this.subDirection.push({Text: step[j]});
          }    
          this.directions.push({
            subDirection:this.subDirection 
          }) 
        }
        else{
          this.directions.push({
            subDirection:[{
              Text: this.recipieDetails.Directions[i]
            }]
          })
        }
      }
      for(let i=0; i<this.recipieDetails.PhotosList.length;i++)
      {
        if(this.recipieDetails.PhotosList[i].isPrimary)
          this.primaryImage = this.recipieDetails.PhotosList[i].s3Url
      }
      this.storage.get('FullLookUp').then((val) => {    
        if(val.length > 0){
          if(val[0].CategoryTag != null){
            for(let p =0; p<val[0].CategoryTag.length; p++){
              if(val[0].CategoryTag[p].Id == this.recipieDetails.Category){
                this.recipieDetails.Category = val[0].CategoryTag[p].CategoryNameEn;
              }
            }
          }
          if(val[0].CookingTypeTag != null){
            for(let p =0; p<val[0].CookingTypeTag.length; p++){
              if(val[0].CookingTypeTag[p].Id == this.recipieDetails.CookingType){
                this.recipieDetails.CookingType = val[0].CookingTypeTag[p].CookingTypeNameEn;
              }
            }
          }
          if(val[0].CusineTag != null){
            for(let p =0; p<val[0].CusineTag.length; p++){
              if(val[0].CusineTag[p].Id == this.recipieDetails.Cusine){
                this.recipieDetails.Cusine = val[0].CusineTag[p].CusineNameEn;
              }
            }
          }
        }
      })
    });
  }

  VideoPlayClick(){
    this.videoPlayer.play("https://s3.ap-south-1.amazonaws.com/zadapp/videos/GB+10sec+video.mp4").then(() => {
      
      console.log('video completed');
    }).catch(err => {
      alert(err);
      console.log(err);
    });
  }

  RatingClick(event){
    alert(JSON.stringify(event));
    alert(JSON.stringify(this.addReview));
  }

  SaveReviewDetails(){
    alert(JSON.stringify(this.addReview));
  }

  AddNewRecipie(){
    this.IsAddNewRecipie = true;
  }

  CloseAddNewRecipie(){
    this.IsAddNewRecipie = false;
  }

  StylingClick(){
    if(this.ButtonContent == "Show Directions"){
      this.directionStyle = "showContent";
      this.ButtonContent = "Hide Directions";
    }
    else{
      this.directionStyle = "hideContent";
      this.ButtonContent = "Show Directions";
    }
  }

  ShowItems(item){
    this.ShowItem = item;
  }

  RecipieOwnerClick(event, profileId) {
    this.navCtrl.push(Profile, {
       IsViewOtherProfile: true,
       UserId : profileId
    });
  }
}
