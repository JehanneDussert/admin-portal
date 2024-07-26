export interface Review {
	title: string;
	desc: string;
	rate: number;
	date: Date;
}

export interface Product {
	id: number;
	title: string;
	desc: string;
	resume: string;
	price: number;
	average_rate: number;
	reviews: Review[];
	last_modified: Date;
}
