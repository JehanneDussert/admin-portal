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

	const handleSearch = async (text: string) => {
		const data = await useFetch({
			url: GET_PRODUCTS_BY_NAME + `?product_name=${text}`,
			method: 'GET',
		});
		setProducts(data);
	};

	const handleSort = async (type: string) => {
		const data = await useFetch({
			url: GET_ALL_PRODUCTS + `/${type}`,
			method: 'GET',
		});
		setProducts(data);
	};

	useEffect(() => {
		handleSearch('');
	}, []);

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
					undoDisability={deletedProducts.length === 0}
					redoDisability={redoProducts.length === 0}
				/>
			</div>
			<ProductsList
				products={products}
				setProducts={setProducts}
				setDeletedProducts={setDeletedProducts}
			/>
			{/* SET PAGINATION */}
		</div>
	);
}
