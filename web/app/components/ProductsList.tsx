import React, { useEffect, useState } from 'react';
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
import { setAllProductsFromData } from 'app/utils/utils';

export const ProductsList: React.FC<ProductsListProps> = ({
	value,
	allProducts,
	setAllProducts,
}) => {
	const [error, setError] = useState<Error | null>(null);

	const handleDelete = async (id: number) => {
		try {
			const data = await useFetch({
				url: DELETE_PRODUCT_BY_ID + `/${id}`,
				method: 'DELETE',
			});

			setAllProductsFromData(data, setAllProducts);
		} catch (error) {
			setError(error as Error);
		}
	};

	const handleRestoreProducts = async (id: number) => {
		try {
			const data = await useFetch({
				url: UPDATE_RESTORE_PRODUCT + `/${id}`,
				method: 'POST',
			});

			setAllProductsFromData(data, setAllProducts);
		} catch (error) {
			setError(error as Error);
		}
	};

	const isValueSelected = (productType: string, products: Product[]) => {
		return value !== productType && products.length !== 0;
	};

	useEffect(() => {
		if (error) {
			throw new Error(`erreur au chargement de la liste produits.`);
		}
	}, [error]);

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
