'use client';

import React, { useEffect, useState } from 'react';
import {
	GET_ALL_PRODUCTS,
	GET_PRODUCTS_BY_NAME,
	selectOptions,
} from './constants/constants';
import { AllProducts, Product } from './interfaces/Product';
import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar';
import { useFetch } from './hooks/hooks';
import { ProductsList } from './components/ProductsList';
import { UndoRedoButtons } from './components/UndoRedoButtons';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';
import { Select } from '@codegouvfr/react-dsfr/SelectNext';

export default function Home() {
	const [allProducts, setAllProducts] = useState<AllProducts>({
		availableProducts: [],
		deletedProducts: [],
		redoProducts: [],
	});
	const [value, setValue] = useState<string>('all');
	const [error, setError] = useState<Error | null>(null);

	const fetchProducts = async (url: string) => {
		try {
			const data = await useFetch({ url, method: 'GET' });

			setAllProducts(() => ({
				availableProducts: data.products.filter(
					(product: Product) => !product.is_deleted,
				),
				deletedProducts: data.products.filter(
					(product: Product) => product.is_deleted,
				),
				redoProducts: data.redo_products,
			}));
			
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
			<div className="fr-grid-row fr-grid-row--gutters">
				<SearchBar
					className="fr-col-9 fr-p-0"
					data-testid="search-bar"
					onButtonClick={handleSearch}
					allowEmptySearch={true}
				/>
				<Select
					className="fr-col-3 fr-p-0"
					label={null}
					options={selectOptions}
					nativeSelectProps={{
						value,
						onChange: (e) => setValue(e.target.value),
					}}
				/>
			</div>
			<div className="fr-grid-row fr-grid-row--right fr-my-4w">
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
					setAllProducts={setAllProducts}
					undoVisibility={allProducts.deletedProducts.length === 0}
					redoVisibility={allProducts.redoProducts.length === 0}
					productId={
						allProducts.deletedProducts[
							allProducts.deletedProducts.length - 1
						] !== undefined
							? allProducts.deletedProducts[
									allProducts.deletedProducts.length - 1
								].id
							: -1
					}
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
