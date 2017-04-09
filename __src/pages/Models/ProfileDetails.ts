export class ProfileDetails {
    FirstName	        : String;
    JobDescription     	: String;
    Followers	        : Array<string>;
    Following    	: Array<string>;
    UserRecipies    	: Array<string>;
    ISPrivate      	: Boolean;  
    Language      	: String;    
    Email    		: String;
    PhoneNumber     	: String;
    LikedRecipies      	: Array<string>;

    constructor(Name : String, JobDescription  : String,   Followers : Array<string>, Following : Array<string>,
                UserRecipies  : Array<string>, ISPrivate: Boolean, Language : String,  Email  : String,
                PhoneNumber : String, LikedRecipies  : Array<string>) {
        this.FirstName = Name;
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
    FirstName	        : "John Doe",
    JobDescription     	: "Chief Chef @ Gate Way Taj",
    Followers	        : ["rherhr", "rehrehrere", "tutikrtu", "yewtbhdfh", "dfoihjko"],
    Following    	: ["dfhjhju", "gh56fg54", "h456gj465fh", "sfg65sg56", "fhds54dfh45", "ds564fg654", "t65he45", "sdg564g546"],
    UserRecipies    	: ["tey5et54", "e65teht56h4", "w686r654g546", "t564et546wr546", "k546tk546t", "dh546hd546hgd", "d546dh546h", "564hdh45g6dh54", "ey56et564t"],
    ISPrivate      	: true,  
    Language      	: "en",
    Email    		: "joeDoe@gmail.com",
    PhoneNumber     	: "654556485",
    LikedRecipies      	: ["gsdjgdjgjs","jsfjsfdjgg","tjudjhgsg","dddgjdhjd","etuetutu","etuetuetet","aeeayee","gdjfgjfgj","sfgjgj","hdgjdggdj","rtuetetu","dhdfdh"]
}

export class GroupDetails {
    Id: string;
    Name: string; 
    Job: string; 
    ImageUrl:string
}