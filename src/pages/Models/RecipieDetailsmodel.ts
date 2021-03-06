export class RecipieDetailsModel {
  Id                  : String;
	RecipeName					: String;		
	RecipeDescription		: String;
	MakerId		     			: String;
	MakerName     			: String;
	MakerImage					: String;
	Time								: String;
	Ingredents    			: Array<string>;
	Directions    			: Array<string>;
	Rating      				: Number;  
	Calories      			: String;    
	PhotosList					: Array<{s3Url: string, isPrimary: boolean}>;
	Category     				: String;
	CookingType      		: String;
	Cusine							: String;
  Reviews  						: [Review];
	constructor(Id : String,RecipeName: String,	RecipeDescription	: String,	MakerId : String, MakerName : String, 
							MakerImage : String, Time: String,
							Ingredents : Array<string>,	Directions : Array<string>,	Rating : Number,  
							Calories : String, 	PhotosList : Array<{s3Url: string, isPrimary: boolean}>,	
							Category : String,	CookingType	: String, Cusine: String, Reviews  : [Review]) {
		this.RecipeName = RecipeName;
		this.RecipeDescription = RecipeDescription;
		this.MakerId = MakerId
		this.MakerName = MakerName;						
		this.Time = Time;
		this.Ingredents = Ingredents;
		this.Directions = Directions;
		this.Rating = Rating;
		this.Calories = Calories;
		this.PhotosList = PhotosList;
		this.Category = Category;		
		this.CookingType = CookingType;
		this.Cusine = Cusine;
	}
}

export class Review {
  Id                    : String;
  ReviewerName     			: String; 
  ReviewedDate      		: String;
  ReviewRating      		: Number;
  ReviewDescription     : String;
	ReviewerImage					: String;
	constructor(ReviewerName : String,  ReviewedDate : String,  ReviewRating 	: Number,
  						ReviewDescription : String,	ReviewerImage	: String) {
		this.ReviewerName = ReviewerName;
		this.ReviewedDate = ReviewedDate;
		this.ReviewRating = ReviewRating;						
		this.ReviewDescription = ReviewDescription;
		this.ReviewerImage = ReviewerImage;
	}
}

export class Recipies{
	Id : string;
	RecipieName: string; 
	RecipieDescription: string; 
	Time: string; 
	Liked: boolean;
	MakerId: string;
	MakerName: string;
	TotalLikes: number;
	Ingredents: Array<string>;
	Directions: Array<string>;
	RatingValue:Number;
	RatingCount: Number;
	Calories: String;
	Images: [{
		URL: String,
		Order: Number,
		Type: String
	}];
	Category: String;
	Language: String;
	CookingType: String;
	Cusine: String;
}


