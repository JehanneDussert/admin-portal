'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS } from '../../constants/constants';
import { Product } from 'app/interfaces/Product';
import { useFetch } from '../../hooks/hooks';
import { UtilitaryProductButtons } from '../../components/UtilitaryProductButtons';
import { Reviews } from 'app/components/Reviews';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { getSeverity } from 'app/utils/utils';
import { Severity } from 'app/interfaces/ComponentsProps';
import { dateOptions } from 'app/constants/DefaultValues';
import { ProductDetailedInfos } from 'app/components/ProductDetailedInfos';

export default function ProductInfos({
	params,
}: {
	params: { productId: number };
}) {
	const [product, setProduct] = useState<Product | null>();
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getProductData = async () => {
			try {
				const data = await useFetch({
					url: GET_ALL_PRODUCTS + `/${params.productId}`,
					method: 'GET',
				});
				setProduct(data);
			} catch (error) {
				setError(error as Error);
			}
		};
		getProductData();
	}, []);

	useEffect(() => {
		if (error) {
			throw new Error(`erreur au chargement du produit sélectionné.`);
		}
	}, [error]);

	return (
		<div className="fr-grid-col">
			{product && (
				<>
					<div className="fr-grid-col">
						{/* Back home, modify, delete buttons */}
						<UtilitaryProductButtons product={product} />
						<h1>{product.title}</h1>
						<p>
							Modifié le{' '}
							{new Date(product.last_modified).toLocaleDateString(
								undefined,
								dateOptions,
							)}
						</p>
					</div>
					<Badge noIcon severity={getSeverity(product.average_rate)}>
						Note moyenne : {product.average_rate}
					</Badge>
					<Badge
						noIcon
						severity={
							product.is_deleted
								? Severity.Error
								: Severity.Success
						}
						className="fr-ml-2w"
					>
						{product.is_deleted ? 'Supprimé' : 'En ligne'}
					</Badge>
					{/* Price, resume, description */}
					<ProductDetailedInfos product={product} />
					<Reviews reviews={product.reviews} />
				</>
			)}
		</div>
	);
}
