import { Product, Review } from './Product';

export interface ProductsListProps {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	setDeletedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	setRedoProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export interface UndoRedoButtonsProps {
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	setDeletedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	setRedoProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	undoVisibility: boolean;
	redoVisibility: boolean;
}

export interface ModifyDeleteButtonsProps {
	product: Product;
}

export interface ReviewsProps {
	reviews: Review[];
}
