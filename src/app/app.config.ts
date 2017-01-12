import { CloudSettings } from '@ionic/cloud-angular';

export class AppConfig {
	//public static BASE_URL: string = 'http://192.168.1.100:8000/'; 
	public static BASE_URL: string = 'http://cryptic-journey-81206.herokuapp.com/public/'; 


	public static cloudSettings: CloudSettings = {
	  'core': {
	    'app_id': 'ade13500'
	  }
	};	
	/*public static get BASE_URL(): string { 
		return 'http://localhost:8000'; 
	}*/
}