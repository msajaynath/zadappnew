export class ProfileDetails {
    Name	        : String;
    id	        : String;
    JobDescription     	: String;
    Followers	        : number;
    Following    	: number;
    UserRecipies    	: number;
    ISPrivate      	: Boolean;  
    Language      	: String;    
    Email    		: String;
    PhoneNumber     	: String;
    LikedRecipies      	: number;

    constructor(Name : String, JobDescription  : String,   Followers : number, Following : number,
                UserRecipies  : number, ISPrivate: Boolean, Language : String,  Email  : String,
                PhoneNumber : String, LikedRecipies  : number) {
        this.Name = Name;
        this.JobDescription = JobDescription;
        this.Followers = Followers;		 				
        this.Following = Following;
        this.UserRecipies = UserRecipies;
        this.ISPrivate = ISPrivate;
        this.Language = Language;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.LikedRecipies = LikedRecipies;	
    }
}

export const ProfileInfo: ProfileDetails = {
    Name	        : "John Doe",
    id:"",
    JobDescription     	: "Chief Chef @ Gate Way Taj",
    Followers	        : 47,
    Following    	: 25,
    UserRecipies    	: 12,
    ISPrivate      	: true,  
    Language      	: "en",
    Email    		: "joeDoe@gmail.com",
    PhoneNumber     	: "654556485",
    LikedRecipies      	: 74
}

export class GroupDetails {
    Id: string;
    Name: string; 
    Job: string; 
    ImageUrl:string
}