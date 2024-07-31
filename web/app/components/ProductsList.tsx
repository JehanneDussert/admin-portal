import React from 'react';
import { useFetch } from '../hooks/hooks';
import {
	DELETE_PRODUCT_BY_ID,
	UPDATE_RESTORE_PRODUCT,
} from '../constants/constants';
import {
	ProductsListProps,
	ProductsType,
	Severity,
} from 'app/interfaces/ComponentsProps';
import { Products } from './Products';
import { Product } from 'app/interfaces/Product';

export const ProductsList: React.FC<ProductsListProps> = ({
	value,
	allProducts,
	setAllProducts,
}) => {
	const handleDelete = async (id: number) => {
		const data = await useFetch({
			url: DELETE_PRODUCT_BY_ID + `/${id}`,
			method: 'DELETE',
		});

		setAllProducts((prevState) => ({
			...prevState,
			availableProducts: data.filter(
				(product: Product) => !product.is_deleted,
			),
			deletedProducts: data.filter(
				(product: Product) => product.is_deleted,
			),
		}));
	};

	const handleRestoreProducts = async (id: number) => {
		const data = await useFetch({
			url: UPDATE_RESTORE_PRODUCT + `/${id}`,
			method: 'POST',
		});

		setAllProducts((prevState) => ({
			...prevState,
			availableProducts: data.products.filter(
				(product: Product) => !product.is_deleted,
			),
			deletedProducts: data.products.filter(
				(product: Product) => product.is_deleted,
			),
			redoProducts: data.redo_products,
		}));
	};

	const isValueSelected = (productType: string, products: Product[]) => {
		return value !== productType && products.length !== 0;
	};

	return (
		<>
			{isValueSelected(
				ProductsType.Deleted,
				allProducts.availableProducts,
			) && (
				<Products
					title="Produits en ligne"
					products={allProducts.availableProducts}
					severity={Severity.Success}
					badgeTitle="En ligne"
					buttonTitle="Supprimer"
					handleClick={handleDelete}
				/>
			)}
			{isValueSelected(
				ProductsType.Available,
				allProducts.deletedProducts,
			) && (
				<Products
					title="Produits supprimés"
					products={allProducts.deletedProducts}
					severity={Severity.Error}
					badgeTitle="Supprimé"
					buttonTitle="Restaurer"
					handleClick={handleRestoreProducts}
				/>
			)}
			{!isValueSelected(
				ProductsType.Deleted,
				allProducts.availableProducts,
			) &&
				!isValueSelected(
					ProductsType.Available,
					allProducts.deletedProducts,
				) && <h1>Aucun produit ne correspond à votre recherche.</h1>}
		</>
	);
};
