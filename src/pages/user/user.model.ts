export interface User{
	id?              : number,
	id_social?       : string,
	first_name?      : string,
	last_name?       : string,
	username?        : string,
	email?           : string,	
	role?            : number,
	picture?         : string,
	social?          : string,
	social_token?    : string,
	password?        : string,
	password_random? : string,
	createdAt?       : Object,
	updatedAt?       : Object
}