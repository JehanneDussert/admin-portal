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
	is_deleted: boolean;
}

export interface AllProducts {
	availableProducts: Product[];
	deletedProducts: Product[];
	redoProducts: Product[];
}

export type Severity = 'success' | 'error' | 'default';

export interface SeverityStates {
	price: Severity;
	title: Severity;
	resume: Severity;
	desc: Severity;
}
