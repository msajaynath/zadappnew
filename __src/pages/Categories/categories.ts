import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/Home';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class Categories {
  Categories: Array<{Id: string, CategoryNameEn: string, CategoryNameAr: string, CategoryImageUrl: string}>;

  constructor(public navCtrl: NavController, public storage:Storage, public navParams: NavParams) {
    this.storage.get('FullLookUp').then((val) => {    
        if(val.length > 0){
          if(val[0].CategoryTag != null){
            this.Categories = val[0].CategoryTag;
          }
        }
      })
    }
    CategoryClicked(event, item) {
      this.navCtrl.push(Home, {
        PageName: "Categories",
        categoryId: item.CategoryId
      });
    }
  } 
