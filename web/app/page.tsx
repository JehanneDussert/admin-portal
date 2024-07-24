'use client';

import React, { useEffect, useState } from 'react';
import { GET_PRODUCTS_BY_NAME } from './constants';
import { Product } from './interfaces';
import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar';
import { useFetch } from './utils';
import { ProductsList } from './components/ProductsList';
import { UndoRedoButtons } from './components/UndoRedoButtons';

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

	useEffect(() => {
		handleSearch('');
	}, []);

	return (
		<div className="fr-container fr-my-4w">
			<SearchBar onButtonClick={handleSearch} allowEmptySearch={true} />
			<UndoRedoButtons
				setProducts={setProducts}
				setDeletedProducts={setDeletedProducts}
				setRedoProducts={setRedoProducts}
				undoDisability={deletedProducts.length === 0}
				redoDisability={redoProducts.length === 0}
			/>
			<ProductsList
				products={products}
				setProducts={setProducts}
				setDeletedProducts={setDeletedProducts}
			/>
			{/* SET PAGINATION */}
		</div>
	);
}
