import {Injectable} from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class CommonServices {	
	CategoryTag: Array<{Id: string, CategoryNameEn: string, CategoryNameAr: string, CategoryImageUrl: string}>;
  CookingTypeTag: Array<{Id: string, CookingTypeNameEn: string, CookingTypeNameAr: string}>;
  CusineTag: Array<{Id: string, CusineNameEn: string, CusineNameAr: string}>;
  Time: Array<{Id: string, TimeEn: string, TimeAr: string}>;
	Calories: Array<{Id: string, CaloriesNameEn: string, CaloriesNameAr: string}>;

  public LookUp: any;


	Url: string;
	constructor( private http: Http){
		this.Url = "https://pacific-mesa-18419.herokuapp.com/zadapi/v1/" ;
  }

GetAllLookUp(){
 
    
    this.LookUp=[];
     return new Promise(resolve=>{  this.http.get(this.Url + 'masterdata/getall').map(res => res.json())
        .subscribe(data => {
          debugger;
          // this.LookUp = data);
          //   console.log(this.LookUp );
            resolve(data);
        }, error => {
            console.log("Oooops!");
        });
      });
                 
    
  }
}