'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS } from '../../constants/constants';
import { Product } from 'app/interfaces/Product';
import { Accordion } from '@codegouvfr/react-dsfr/Accordion';
import { useFetch } from '../../hooks/hooks';
import { ModifyDeleteButtons } from '../../components/ModifyDeleteButtons';
import { Reviews } from 'app/components/Reviews';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { getSeverity } from 'app/utils/utils';
import { Severity } from 'app/interfaces/ComponentsProps';
import Button from '@codegouvfr/react-dsfr/Button';
import { useRouter } from 'next/navigation';

export default function ProductInfos({
	params,
}: {
	params: { productId: number };
}) {
	const [product, setProduct] = useState<Product | null>();
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const router = useRouter();
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
			throw new Error(`Error loading products`);
		}
	}, [error]);

	return (
		<div className="fr-grid-col">
			{product && (
				<>
					<div className="fr-grid-col">
						<div className="fr-grid-row fr-my-4w">
							<Button
								iconId="fr-icon-arrow-left-s-line"
								onClick={() => router.push('/')}
							>
								Retour
							</Button>
							<ModifyDeleteButtons product={product} />
						</div>
							<h1 className="">{product.title}</h1>
							<p>
								Modifié le{' '}
								{new Date(
									product.last_modified,
								).toLocaleDateString(undefined, options)}
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
					<h3 className="fr-my-2w">{product.price}€</h3>
					<div className="fr-container fr-my-4w">
						<div className="fr-grid-row fr-grid-row--center">
							<img
								className="fr-mb-2w"
								src="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
							/>
						</div>
					</div>
					<Accordion label="Résumé">{product.resume}</Accordion>
					<Accordion label="Description">{product.desc}</Accordion>
					<h6 className="fr-my-2w">
						Avis clients ({product.reviews.length})
					</h6>
					<Reviews reviews={product.reviews} />
				</>
			)}
		</div>
	);
}
