'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_NAME } from './constants/constants';
import { AllProducts } from './interfaces/Product';
import { ProductsList } from './components/ProductsList';
import { UndoRedoButtons } from './components/UndoRedoButtons';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';
import { setAllProductsFromData } from './utils/utils';
import { defaultAllProducts } from './interfaces/DefaultValues';
import { SearchFilters } from './components/SearchFilters';
import { useFetch } from './hooks/hooks';
import { radioButtonsOptions } from './constants/DefaultValues';

export default function Home() {
	const [allProducts, setAllProducts] =
		useState<AllProducts>(defaultAllProducts);
	const [lastDeletedProductId, setLastDeletedProductId] =
		useState<number>(-1);
	const [value, setValue] = useState<string>('all');
	const [error, setError] = useState<Error | null>(null);

	const fetchProducts = async (url: string) => {
		try {
			const data = await useFetch({ url, method: 'GET' });

			setAllProductsFromData(data, setAllProducts);
		} catch (error) {
			setError(error as Error);
		}
	};

	useEffect(() => {
		fetchProducts(GET_PRODUCTS_BY_NAME + `?product_name=`);
	}, []);

	const handleSort = (type: string) => {
		fetchProducts(GET_ALL_PRODUCTS + `/${type}`);
	};

	useEffect(() => {
		if (error) {
			throw new Error(`erreur au chargement de la liste produits.`);
		}
	}, [error]);

	useEffect(() => {
		if (allProducts.deletedProducts.length)
			setLastDeletedProductId(
				allProducts.deletedProducts[
					allProducts.deletedProducts.length - 1
				].id,
			);
	}, [allProducts.deletedProducts]);

	return (
		<div className="fr-container fr-my-4w">
			<SearchFilters
				value={value}
				setValue={setValue}
				fetchProducts={fetchProducts}
			/>
			<div className="fr-grid-row fr-grid-row--right fr-my-4w">
				<RadioButtons
					legend="Trier par"
					name="radio"
					className="fr-col"
					options={radioButtonsOptions.map((option) => ({
						label: option.label,
						nativeInputProps: {
							value: option.value,
							defaultChecked: option.defaultChecked,
							onClick: () => handleSort(option.sort_by),
						},
					}))}
					orientation="horizontal"
				/>
				<UndoRedoButtons
					data-testid="undo-redo-buttons"
					setAllProducts={setAllProducts}
					undoVisibility={allProducts.deletedProducts.length === 0}
					redoVisibility={allProducts.redoProducts.length === 0}
					productId={lastDeletedProductId}
				/>
			</div>
			<ProductsList
				value={value}
				allProducts={allProducts}
				setAllProducts={setAllProducts}
			/>
		</div>
	);
}
