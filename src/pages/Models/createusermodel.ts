export class CreateUserModel {	
  Password								: String;
	ConfirmPassword					: String;
  FirstName                    : String;
  JobDescription     			: String;;
  ISPrivate      					: Boolean;  
  Language      					: String;    
  Email    								: String;
  PhoneNumber     				: String;
	constructor(Password: String, ConfirmPassword: String, Name : String, JobDescription : String, 
              ISPrivate : Boolean,Language 	: String,  Email : String,  PhoneNumber: String) {
		this.Password = Password;
		this.ConfirmPassword = ConfirmPassword;
		this.FirstName = Name;						
		this.JobDescription = JobDescription;
		this.ISPrivate = ISPrivate;
		this.Language = Language;
		this.Email = Email;
		this.PhoneNumber = PhoneNumber;
	}
}


