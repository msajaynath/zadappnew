import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import { RecipieDetailsModel } from '../Models/RecipieDetailsmodel';
import { Observable } from 'rxjs/Observable';

import { RecipieMockInfo } from '../Models/RecipieDetailsMock';
import { Recipies } from '../Models/RecipieDetailsmodel'

@Injectable()
export class RecipieService {
	text : String;
	RecipieInfo : RecipieDetailsModel;
	Url: string;
  CreatedRecipe:any;
	Recipies: Array<Recipies>;
	constructor( private http: Http){
		this.Url = "https://pacific-mesa-18419.herokuapp.com/zadapi/v1/recipe/" ;
    this.CreatedRecipe=null;
  }

	SaveRecipie(RecipieInfo) {
		debugger;
    return new Promise(resolve=>{  this.http.post(this.Url + 'create', RecipieInfo)
        .subscribe(data => {
         // this.CreatedRecipe=data["_body"];
            resolve(data.json());
        }, error => {
            console.log("Oooops!");
        });
      });
	}

	GetRecipieDetailsById(RecipieId) {
		this.RecipieInfo = RecipieMockInfo;
		return Promise.resolve(this.RecipieInfo);
	}

	GetAllRecipies(Categories: Array<string>, Cusines: Array<string>, CookingType : Array<string>, time: string, calories: string){
		this.Recipies = [];
    
			this.Recipies.push({
				Id : "dh54dfh54f54",
				RecipieName: 'Pan Cakes',
				RecipieDescription: 'Pan cakes stuffed with paneer',
				Time : "25",
				ImageURL: [{s3Url: 'assets/Images/PanCakes.jpg', isPrimary: true}] ,
				Liked: false,
				MakerId: "dfh54dfhdf4",
				MakerName: "Illeana Sebastain",
				TotalLikes: 34
			});
			this.Recipies.push({
				Id : "d56dg56hdh",
				RecipieName: 'Chat',
				RecipieDescription: 'Indian Chat Baji',
				Time : "15",
				ImageURL: [{s3Url: 'assets/Images/Chat.jpg', isPrimary: true}] ,
				Liked: true,
				MakerId: "dfh54dfhdf4",
				MakerName: "John David",
				TotalLikes: 23
			});		
			this.Recipies.push({
				Id : "tyujtyj3v5j54",
				RecipieName: 'Beef',
				RecipieDescription: 'Beef Ulathiyathu with Cocunut peels',
				Time : "25",
				ImageURL: [{s3Url: 'assets/Images/BeefRoast.jpg', isPrimary: true}] ,
				Liked: true,
				MakerId: "dfh5645df",
				MakerName: "Glen Maxwell",
				TotalLikes: 34
			});	
			this.Recipies.push({
				Id : "54dh54dfh54",
				RecipieName: 'Chicken',
				RecipieDescription: 'Chicken 65 with grooves',
				Time : "65",
				ImageURL: [{s3Url: 'assets/Images/Chicken.jpg', isPrimary: true}] ,
				Liked: false,
				MakerId: "dfh54dfhdf4",
				MakerName: "Mia George",
				TotalLikes: 56
			});	
		return Promise.resolve(this.Recipies);
	}

	GetAllRecipiesByUserId(UserId: string){
		this.Recipies = [];
			this.Recipies.push({
				Id : "dh54dfh54f54",
				RecipieName: 'Pan Cakes',
				RecipieDescription: 'Pan cakes stuffed with paneer',
				Time : "25",
				ImageURL: [{s3Url: 'assets/Images/PanCakes.jpg', isPrimary: true}] ,
				Liked: false,
				MakerId: "dfh54dfhdf4",
				MakerName: "Illeana Sebastain",
				TotalLikes: 34
			});
			this.Recipies.push({
				Id : "d56dg56hdh",
				RecipieName: 'Chat',
				RecipieDescription: 'Indian Chat Baji',
				Time : "15",
				ImageURL: [{s3Url: 'assets/Images/Chat.jpg', isPrimary: true}] ,
				Liked: true,
				MakerId: "dfh54dfhdf4",
				MakerName: "John David",
				TotalLikes: 23
			});	
			return Promise.resolve(this.Recipies);
	}

	GetAllRecipiesByCookBookId(CookBookId: string){
		this.Recipies = [];
			
			this.Recipies.push({
				Id : "dh54dfh54f54",
				RecipieName: 'Pan Cakes',
				RecipieDescription: 'Pan cakes stuffed with paneer',
				Time : "25",
				ImageURL: [{s3Url: 'assets/Images/PanCakes.jpg', isPrimary: true}] ,
				Liked: false,
				MakerId: "dfh54dfhdf4",
				MakerName: "Illeana Sebastain",
				TotalLikes: 34
			});
			this.Recipies.push({
				Id : "tyujtyj3v5j54",
				RecipieName: 'Beef',
				RecipieDescription: 'Beef Ulathiyathu with Cocunut peels',
				Time : "25",
				ImageURL: [{s3Url: 'assets/Images/BeefRoast.jpg', isPrimary: true}] ,
				Liked: true,
				MakerId: "dfh5645df",
				MakerName: "Glen Maxwell",
				TotalLikes: 34
			});	
			return Promise.resolve(this.Recipies);
	}

	GetAllRecipiesByCategoryId(CategoryId: string){
		this.Recipies = [];
	
			this.Recipies.push({
				Id : "d56dg56hdh",
				RecipieName: 'Chat',
				RecipieDescription: 'Indian Chat Baji',
				Time : "15",
				ImageURL: [{s3Url: 'assets/Images/Chat.jpg', isPrimary: true}] ,
				Liked: true,
				MakerId: "dfh54dfhdf4",
				MakerName: "John David",
				TotalLikes: 23
			});
			this.Recipies.push({
				Id : "54dh54dfh54",
				RecipieName: 'Chicken',
				RecipieDescription: 'Chicken 65 with grooves',
				Time : "65",
				ImageURL: [{s3Url: 'assets/Images/Chicken.jpg', isPrimary: true}] ,
				Liked: false,
				MakerId: "dfh54dfhdf4",
				MakerName: "Mia George",
				TotalLikes: 56
			});
			return Promise.resolve(this.Recipies);
	}
}