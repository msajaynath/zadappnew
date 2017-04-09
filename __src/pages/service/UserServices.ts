import {Injectable} from "@angular/core";
import { ProfileDetails, ProfileInfo, GroupDetails } from '../Models/ProfileDetails'
import {   Http } from '@angular/http';

@Injectable()
export class UserService {
	text : String;
	profileDetails : ProfileDetails;
	images: Array<string>; 
	Followers: Array<GroupDetails>;
	Followings: Array<GroupDetails>;
		Url: string;

	LoggedInUserDetails : any
constructor( private http: Http){
		this.Url = "https://pacific-mesa-18419.herokuapp.com/zadapi/v1/users/" ;
  }
	SaveUser(UserInfo) {	
		// this.text = 'User Saved Successfully'
		// return Promise.resolve(this.text);


		return new Promise(resolve=>{  this.http.post(this.Url + 'signup', UserInfo)
        .subscribe(data => {
            resolve(data.json());
        }, error => {
            console.log("Oooops!");
        });
      });
	}

	

	GetUserDetailsById(UserId) {
		this.profileDetails = ProfileInfo;
		return Promise.resolve(this.profileDetails);
	}

	GetUserRecipiesDetailsByRecipieId(RecipieId) {
		this.images =[];
    this.images.push("assets/CategoriesImg/app-icon.png");
    this.images.push("assets/CategoriesImg/bev-icon.png");
    this.images.push("assets/CategoriesImg/bread-icon.png");
    this.images.push("assets/CategoriesImg/breakfast-icon.png");
    this.images.push("assets/CategoriesImg/cocktails-icon.png");
    this.images.push("assets/CategoriesImg/dessert-icon.png");
    this.images.push("assets/CategoriesImg/fish-icon.png");
    this.images.push("assets/CategoriesImg/Meat-icon.png");
    this.images.push("assets/CategoriesImg/salad-icon.png");

		return Promise.resolve(this.images);
	}

	LoginValidation(UserId, Password) {

		return new Promise(resolve=>{  this.http.post(this.Url + 'login', {UserName:UserId,Password:Password})
        .subscribe(data => {
          ///this.CreatedRecipe=data["_body"];
            resolve(data.json());
        }, error => {
            console.log("Oooops!");
        });
      });
	}
	

	GetFollowersList(userId){
		this.Followers = [];
		this.Followers.push({
			Id: 'fg564dgh54dh',
			Name: 'Finn',
			Job: 'Listen, I have had a pretty messed up day...',
			ImageUrl: 'assets/img/avatar-finn.png'
		});		 
		this.Followers.push({
			Id: 'fh654dfh654',
			Name: 'Han',
			Job: 'I have got enough on my plate as it is, and I...',
			ImageUrl: 'assets/img/avatar-han.png'
		});	
		this.Followers.push({
			Id: 'fg564the65ryj654dgh54dh',
			Name: 'Rey',
			Job: 'You will remove these restraints and leave...',
			ImageUrl: 'assets/img/avatar-rey.png'
		});	
		this.Followers.push({
			Id: 'yh456tyk65ktu',
			Name: 'Luke',
			Job: 'I feel the good in you, the conflict...',
			ImageUrl: 'assets/img/avatar-luke.png'
		});	
		return Promise.resolve(this.Followers);
	}

	GetFollowingList(userId){
		this.Followings = [];
		this.Followings.push({
			Id: 'j54j465',
			Name: 'Yoda',
			Job: 'Do or do not. There is no try...',
			ImageUrl: 'assets/img/avatar-yoda.png'
		});		 
		this.Followings.push({
			Id: 'gh546gj654',
			Name: 'Leia',
			Job: 'I have placed information vital to the survival...',
			ImageUrl: 'assets/img/avatar-leia.png'
		});	
		this.Followings.push({
			Id: 'gh65fj65',
			Name: 'Ben',
			Job: 'These arent the droids you are looking for..',
			ImageUrl: 'assets/img/avatar-ben.png'
		});	
		this.Followings.push({
			Id: 'h564jg654',
			Name: 'Poe',
			Job: 'I just upgraded my X-Wing. Next time...',
			ImageUrl: 'assets/img/avatar-poe.png'
		});	
		return Promise.resolve(this.Followings);
	}

	LikeRecipie(UserId, RecipieId){
		return Promise.resolve("Recipie Liked");
	}
}