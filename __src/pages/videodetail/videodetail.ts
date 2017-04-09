import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/*
  Generated class for the Videodetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-videodetail',
  templateUrl: 'videodetail.html'
})
export class VideodetailPage {

  constructor(private screenOrientation: ScreenOrientation,public navCtrl: NavController, public navParams: NavParams) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad VideodetailPage');
  }

}
