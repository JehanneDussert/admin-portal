import { AllProducts, Product, Review } from './Product';

export interface ProductsListProps {
	value: string;
	allProducts: AllProducts;
	setAllProducts: React.Dispatch<React.SetStateAction<AllProducts>>;
}

export interface UndoRedoButtonsProps {
	setAllProducts: React.Dispatch<React.SetStateAction<AllProducts>>;
	undoVisibility: boolean;
	redoVisibility: boolean;
	productId: number;
}

export interface ModifyDeleteButtonsProps {
	product: Product;
}

export interface ReviewsProps {
	reviews: Review[];
}

export enum ProductsType {
	All = 'all',
	Available = 'available',
	Deleted = 'deleted',
}

export enum Severity {
	Error = 'error',
	Success = 'success',
}

export interface ProductsProps {
	title: string;
	products: Product[];
	severity: Severity | 'new' | undefined;
	badgeTitle: string;
	buttonTitle: string;
	handleClick: (productId: number) => void;
}
