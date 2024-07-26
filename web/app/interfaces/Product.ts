export interface Review {
	title: string;
	desc: string;
	rate: number;
}

export interface Product {
	id: number;
	title: string;
	desc: string;
	resume: string;
	price: number;
	reviews: Review[];
}
