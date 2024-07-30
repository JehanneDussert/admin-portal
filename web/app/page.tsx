'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_NAME } from './constants/constants';
import { Product } from './interfaces/Product';
import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar';
import { useFetch } from './hooks/hooks';
import { ProductsList } from './components/ProductsList';
import { UndoRedoButtons } from './components/UndoRedoButtons';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [deletedProducts, setDeletedProducts] = useState<Product[]>([]);
	const [redoProducts, setRedoProducts] = useState<Product[]>([]);
	const [error, setError] = useState<Error | null>(null);

	const fetchProducts = async (url: string) => {
		try {
			const data = await useFetch({ url, method: 'GET' });

			setProducts(data.products);
			setDeletedProducts(data.deleted_products);
			setRedoProducts(data.redo_products);
		} catch (error) {
			setError(error as Error);
		}
	};

	useEffect(() => {
		fetchProducts(GET_PRODUCTS_BY_NAME + `?product_name=`);
	}, []);

	const handleSearch = (text: string) => {
		fetchProducts(GET_PRODUCTS_BY_NAME + `?product_name=${text}`);
	};

	const handleSort = (type: string) => {
		fetchProducts(GET_ALL_PRODUCTS + `/${type}`);
	};

	useEffect(() => {
		if (error) {
			throw new Error(`Error loading products`);
		}
	}, [error]);

	return (
		<div className="fr-container fr-my-4w">
			<SearchBar
				data-testid="search-bar"
				onButtonClick={handleSearch}
				allowEmptySearch={true}
			/>
			<div className="fr-grid-row fr-grid-row--right fr-my-2w">
				<RadioButtons
					legend="Trier par"
					name="radio"
					className="fr-col"
					options={[
						{
							label: 'Nom',
							nativeInputProps: {
								value: 'name',
								onClick: () => handleSort('sort_by_name'),
							},
						},
						{
							label: 'Date de modification',
							nativeInputProps: {
								value: 'date',
								onClick: () => handleSort('sort_by_date'),
							},
						},
						{
							label: 'Note',
							nativeInputProps: {
								value: 'rate',
								onClick: () => handleSort('sort_by_rate'),
							},
						},
					]}
					orientation="horizontal"
				/>
				<UndoRedoButtons
					data-testid="undo-redo-buttons"
					setProducts={setProducts}
					setDeletedProducts={setDeletedProducts}
					setRedoProducts={setRedoProducts}
					undoVisibility={deletedProducts.length === 0}
					redoVisibility={redoProducts.length === 0}
					productId={deletedProducts[deletedProducts.length - 1] !== undefined ? deletedProducts[deletedProducts.length - 1].id : -1}
				/>
			</div>
			<ProductsList
				products={products}
				setProducts={setProducts}
				setDeletedProducts={setDeletedProducts}
				setRedoProducts={setRedoProducts}
			/>
			{/* SET PAGINATION */}
		</div>
	);
}
