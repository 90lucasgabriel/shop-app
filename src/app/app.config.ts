import { CloudSettings } from '@ionic/cloud-angular';

export class AppConfig {
	//public static BASE_URL: string = 'http://localhost:8000/'; 
	//public static BASE_URL: string = 'http://192.168.1.107:8000/'; 
	public static BASE_URL: string = 'http://powerful-reaches-24488.herokuapp.com//public/'; 
 

	//ionic.io
	public static CLOUD_SETTINGS: CloudSettings = {
	  'core': {
	    'app_id': 'ade13500'
	  }
	};	

	//PASSPORT OAUTH
	public static OAUTH_CLIENT_ID       : string = "QTt6rkHVWJ4Zw+bfl9/i8sTRmlZ5RKwyscs//092Tp0=";
	public static OAUTH_CLIENT_SECRET   : string = "5WJMODw3NYW4AEPa5tWDWNsXm7w8+y0fMNn3D01Ryio=";


	//oAuth2
	//public static OAUTH_CLIENT_ID     : string = "appId1";
	//public static OAUTH_CLIENT_SECRET : string = "secret";









	/*public static get BASE_URL(): string { 
		return 'http://localhost:8000'; 
	}*/
}