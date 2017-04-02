import { Component } from '@angular/core';
import { NavController, NavParams , ToastController} from 'ionic-angular';

@Component({
  selector: 'page-favouritelist',
  templateUrl: 'favouritelist.html'
})
export class FavouriteList {
  MyCookBook: Array<{CookBookId: string, CookBookName: string, IsSelectedForRecipie: boolean}>;
  IsNewCookBookClicked: boolean;
  NewcookBookName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.IsNewCookBookClicked = false;
    this.MyCookBook = [];
    this.MyCookBook.push({CookBookId: "h65454fgh", CookBookName: "Breakfast", IsSelectedForRecipie: true})
    this.MyCookBook.push({CookBookId: "fjf65jg564", CookBookName: "Dessert", IsSelectedForRecipie: false})
    this.MyCookBook.push({CookBookId: "r654fg654", CookBookName: "Drinks", IsSelectedForRecipie: false})
    this.MyCookBook.push({CookBookId: "dhg8gh54", CookBookName: "Lunch", IsSelectedForRecipie: true})
    this.MyCookBook.push({CookBookId: "rt654fhg5", CookBookName: "Side Dish", IsSelectedForRecipie: false})
    this.MyCookBook.push({CookBookId: "tygf5gh5", CookBookName: "Snacks", IsSelectedForRecipie: true})
  }

  AddNewCookBook(){
    this.IsNewCookBookClicked = true;
  }

  saveMyCookBook(item){
    if(item.IsSelectedForRecipie)
      this.SHowToastMessage("Recipie added to your cookbook");
    else
      this.SHowToastMessage("Recipie removed from your cookbook");
  }

  NewCookBookClicked(){
    this.MyCookBook.push({CookBookId: "h65454fgh", CookBookName: this.NewcookBookName, IsSelectedForRecipie: true})
    this.NewcookBookName = "";
    this.IsNewCookBookClicked = false;
  }

  SHowToastMessage(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    })
    toast.present();
  }
}
