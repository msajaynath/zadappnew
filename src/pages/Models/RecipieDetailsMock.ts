import { RecipieDetailsModel } from './RecipieDetailsmodel'

export const RecipieMockInfo: RecipieDetailsModel = {
  "Id"                  : "dhg654gh654fg",
  "RecipeName"          : "Mysore Burfi",
  "RecipeDescription"		: "A dash of cocunut",
	"MakerName"     			: "Joe Doe",
  "MakerId"             : "dghjkdghkj" ,
  "MakerImage"          : "assets/Profile/profile.jpg",
	"Time"								: "30",
	"Ingredents"    			: [
                            '0.5 kg of Wheat',
                            '2 teaspoon of valila essence',
                            '0.25 kg of sugar',
                            '1 pealed cocunut',
                            '50 gram of butter',
                            '1 pinch of salt'
                            ],
	"Directions"    			:     ["Take the heavy bottom pan and heat the milk over high flame. \nSqueeze the lemons or add the lime juice and stir the milk continually for 5 minutes.",
                                "Curd will form slowly when the milk is heated at high temperature. \nIt forms when the milk fat separates from the whey. When the milk is boiled, drain the whey and filter the pure milk with help of strainer.",
                                "The formed curd should be wrapped in the cloth and rinsed before using. \nRinse and squeeze well the muslin cloth which wraps the curd.",
                                "Add oil in the frying pan and heat it over the high flame. Melt the butter. \nAdd milk powder and mix well. After stirring well add the curd. Cook the mixture on a high flame till it forms a soft dough. Keep stirring for 12 minutes at intervals to form proper",
                                "When the dough, i.e. khoya is prepared, turn off the flame and let the mixture rest in the pan till it cools. \nOnce it is cooled, transfer it to the large mixing bowl and let it rest till it take the room temperature.",
                                "To this bowl, add cardamom powder and sugar. Knead the dough with soft hands to blend the ingredients with dough.",
                                "Take the rectangular or square-shaped plates, apply oil or grease it gently and insert the Barfi mixture. \nCut the small cubes of Barfi, each of equal size."
                              ],
	"Rating"      				: 4.5,  
	"Calories"      			: "650",    
	"PhotosList"					: [
                            {s3Url: "assets/images/burfi.jpg", isPrimary: true},
                            {s3Url: "assets/images/burfi1.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi2.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi2.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi2.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi3.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi4.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi5.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi5.jpg", isPrimary: false},
                            {s3Url: "assets/images/burfi5.jpg", isPrimary: false}
                          ],
	"Category"     				: "546g5ej46sg",
	"CookingType"      		: "546getj546sg",
	"Cusine"							: "546gtk5rk46sg",
  "Reviews"             : [
                            {Id: "546fg5dh46", ReviewerName : "Tom Joe", ReviewerImage: 'assets/img/avatar-finn.png', ReviewedDate : "2 weeks ago", ReviewRating: 3.5, ReviewDescription: "So delicious kaju burfi. Everyone can make a try. Its too good to eat"},
                            {Id: "gjfg46fg546",  ReviewerName : "Philip Joe", ReviewerImage: 'assets/img/avatar-han.png', ReviewedDate : "10 days ago", ReviewRating: 4, ReviewDescription: "Its finger licking good. All my friends enjoyed a lot. Absolute awesome"}
                          ]
}