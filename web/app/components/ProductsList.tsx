import React, { useEffect } from 'react';
import Card from '@codegouvfr/react-dsfr/Card';
import { useRouter } from 'next/navigation';
import { useFetch } from '../hooks/hooks';
import {
	DELETE_PRODUCT_BY_ID,
	GET_DELETED_PRODUCTS,
	UPDATE_RESTORE_PRODUCT,
} from '../constants/constants';
import { ProductsListProps, Severity } from 'app/interfaces/ComponentsProps';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
// import { getSeverity } from 'app/utils/utils';
import { Tag } from '@codegouvfr/react-dsfr/Tag';
import { Products } from './Products';

export const ProductsList: React.FC<ProductsListProps> = ({
	products,
	setProducts,
	setDeletedProducts,
	setRedoProducts,
}) => {
	const router = useRouter();

	const handleDelete = async (id: number) => {
		const updatedProducts = await useFetch({
			url: DELETE_PRODUCT_BY_ID + `/${id}`,
			method: 'DELETE',
		});
		const updatedDeletedProducts = await useFetch({
			url: GET_DELETED_PRODUCTS,
			method: 'GET',
		});

		setProducts(updatedProducts);
		setDeletedProducts(updatedDeletedProducts);
	};

	const handleRestoreProducts = async (id: number) => {
		const data = await useFetch({
			url: UPDATE_RESTORE_PRODUCT + `/${id}`,
			method: 'POST',
		});

		setProducts(data.products);
		setDeletedProducts(data.deleted_products);
		setRedoProducts(data.redo_products);
	};

	return (
		<>
			<h1>Produits en ligne</h1>
			<Products
				products={products.filter((product) => !product.is_deleted)}
				severity={Severity.Success}
				badgeTitle="En ligne"
				buttonTitle="Supprimer"
				handleClick={handleDelete}
			/>
			<h1>Produits supprimés</h1>
			<Products
				products={products.filter((product) => product.is_deleted)}
				severity={Severity.Error}
				badgeTitle="Supprimé"
				buttonTitle="Restaurer"
				handleClick={handleRestoreProducts}
			/>
		</>
	);
};
