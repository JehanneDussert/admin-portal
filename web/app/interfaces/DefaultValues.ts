import { AllProducts, Product, SeverityStates } from './Product';

export const defaultProduct: Product = {
	id: -1,
	title: '',
	desc: '',
	resume: '',
	price: 0,
	average_rate: 0,
	reviews: [],
	last_modified: new Date(),
	is_deleted: false,
};

export const defaultAllProducts: AllProducts = {
	availableProducts: [],
	deletedProducts: [],
	redoProducts: [],
};

export const defaultSeverityStates: SeverityStates = {
	price: 'default',
	title: 'default',
	resume: 'default',
	desc: 'default',
};
