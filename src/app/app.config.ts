import { CloudSettings } from '@ionic/cloud-angular';

export class AppConfig {
	public static BASE_URL: string = 'http://localhost:8000/'; 
	//public static BASE_URL: string = 'http://192.168.1.102:8000/'; 
	//public static BASE_URL: string = 'http://cryptic-journey-81206.herokuapp.com/public/'; 


	//ionic.io
	public static CLOUD_SETTINGS: CloudSettings = {
	  'core': {
	    'app_id': 'ade13500'
	  }
	};	


	//oAuth2
	public static OAUTH_CLIENT_ID     : string = "appId1";
	public static OAUTH_CLIENT_SECRET : string = "secret";









	/*public static get BASE_URL(): string { 
		return 'http://localhost:8000'; 
	}*/
}