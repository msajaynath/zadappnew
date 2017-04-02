export class CreateRecipieModel {
	RecipeName					: String;		
	RecipeDescription		: String;
	MakerId		     			: String;
	MakerName     			: String;
	Time								: String;
	Ingredents    			: Array<string>;
	Directions    			: Array<string>;
	Rating      				: Number;  
	Calories      			: String;    
	PhotosList					: Array<{s3Url: string, isPrimary: boolean}>;
	Category     				: String;
	CookingType      		: String;
	Cusine							: String;
	constructor(RecipeName: String,	RecipeDescription	: String,	MakerId : String, MakerName : String, Time: String,
							Ingredents : Array<string>,	Directions : Array<string>,	Rating : Number,  
							Calories : String, 	PhotosList : Array<{s3Url: string, isPrimary: boolean}>,	
							Category : String,	CookingType	: String, Cusine: String) {
		this.RecipeName = RecipeName;
		this.RecipeDescription = RecipeDescription;
		this.MakerId  =  MakerId;
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




