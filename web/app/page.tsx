'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_NAME } from './utils/constants';
import { Product } from './interfaces/Product';
import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar';
import { useFetch } from './utils/hooks';
import { ProductsList } from './components/ProductsList';
import { UndoRedoButtons } from './components/UndoRedoButtons';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [deletedProducts, setDeletedProducts] = useState<Product[]>([]);
	const [redoProducts, setRedoProducts] = useState<Product[]>([]);

	const fetchProducts = async (url: string) => {
		const data = await useFetch({ url, method: 'GET' });

		setProducts(data.products);
		setDeletedProducts(data.deleted_products);
		setRedoProducts(data.redo_products);
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
						{
							label: 'Nom',
							nativeInputProps: {
								value: 'name',
								onClick: () => handleSort('sort_by_name'),
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
