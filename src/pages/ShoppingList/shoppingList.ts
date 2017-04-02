import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppingList.html'
})
export class Shoppinglist {
  shoppingList: Array<{RecipieName: string, RecipieImageUrl: string, Ingredents: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.shoppingList = [];
   this.shoppingList.push({
			RecipieName: 'Chicken 65',
			RecipieImageUrl: 'assets/images/Chicken.jpg',
      Ingredents:[{
        IngredentId : "534546sfdh54df",
        IngredentName: "1Kg of Checken",
        Purchased: true
      },
      {
        IngredentId : "534546sfdh54df",
        IngredentName: "2 tea spoon of Chilly powder ",
        Purchased: false
      },
      {
        IngredentId : "534546sfdh54df",
        IngredentName: "1/2 kg of Onion",
        Purchased: false
      },
      {
        IngredentId : "534546sfdh54df",
        IngredentName: "1 tea spoon of Trumeric powder",
        Purchased: true
      }]
		});
    this.shoppingList.push({
			RecipieName: 'Chat Baji',
			RecipieImageUrl: 'assets/images/Chat.jpg',
      Ingredents:[{
        IngredentId : "5f6jh464fh",
        IngredentName: "1/2Kg of Wheat",
        Purchased: false
      },
      {
        IngredentId : "534546sfdh54df",
        IngredentName: "1 cup of water",
        Purchased: true
      },
      {
        IngredentId : "534546sfdh54df",
        IngredentName: "1/4 kg of Onion",
        Purchased: true
      },
      {
        IngredentId : "534546sfdh54df",
        IngredentName: "1 tea spoon of Trumeric powder",
        Purchased: false
      },
      {
        IngredentId : "534546sfdh54df",
        IngredentName: "2 tea spoon of Garam masala",
        Purchased: true
      }]
		});
  } 

  ClearAllIngredents(ind){
    this.shoppingList.splice(ind, 1);
  }
}
