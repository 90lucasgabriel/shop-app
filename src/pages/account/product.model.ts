export interface Product{
	id			: number,
	name        : string,
	price       : number,
	description : string,
	images      : {
		data    : Array<ProductImage>
	},
	created_at  : Object,
	updated_at  : Object
}


export interface ProductImage{
	id          : number,
	url         : string,
	description : string,
	index       : number,
	created_at  : Object,
	updated_at  : Object
}
