import React from 'react';
import { AllProducts, Product } from './Product';

export interface ProductsListProps {
	value: string;
	allProducts: AllProducts;
	setAllProducts: React.Dispatch<React.SetStateAction<AllProducts>>;
}

export interface ProductsProps {
	title: string;
	products: Product[];
	severity: Severity | 'new' | undefined;
	badgeTitle: string;
	buttonTitle: string;
	handleClick: (productId: number) => void;
}

export enum ProductsType {
	All = 'all',
	Available = 'available',
	Deleted = 'deleted',
}

export interface SearchFiltersProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	fetchProducts: (url: string) => void;
}

export enum Severity {
	Error = 'error',
	Success = 'success',
}

export interface UndoRedoButtonsProps {
	setAllProducts: React.Dispatch<React.SetStateAction<AllProducts>>;
	undoVisibility: boolean;
	redoVisibility: boolean;
	productId: number;
}
