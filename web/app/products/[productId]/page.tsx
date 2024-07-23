"use client";

import React, { useEffect, useState } from 'react'
import { GET_ALL_PRODUCTS, DELETE_PRODUCT_BY_ID } from '../../../src/components/constants';
import { Product } from '../../../src/components/interface';
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { useRouter } from 'next/navigation';
import Button from '@codegouvfr/react-dsfr/Button';

export default function ProductInfos({ params }: {params: {productId: Number }}) {
  const	[product, setProduct] = useState<Product | null>();
  const	router = useRouter();
  const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(GET_ALL_PRODUCTS + `/${params.productId}`)
			.then(res => {
				if (!res.ok) {
				throw new Error(`Failed to fetch product: ${res.statusText}`);
				}
				return res.json();
			})
			.then(data => setProduct(data))
			.catch(error => {
				console.error('Error fetching product:', error);
				setError('Failed to fetch product.');
				router.push('/');
			})
	}, []);

	const handleDelete = (id: number) => {
		console.log(id)
		fetch(DELETE_PRODUCT_BY_ID + `?product_id=${id}`, { method: 'DELETE' })
		.then(res => res.json())
		.then(() => router.push('/'));
	}

	return (
		<div className='fr-grid-col'>
			{
				product && <>
				<div className='fr-grid-row'>
					<h1 className='fr-col'>{product?.title}</h1>
					<div className='fr-grid-row fr-grid-row--right'>
					<Button
						iconId="fr-icon-ball-pen-fill"
						priority="tertiary no outline"
						title="Modifier"
						linkProps={{
							href: `/products/${product?.id}/edit`
						}}
					/>
					<Button
						iconId="fr-icon-delete-fill"
						priority="tertiary no outline"
						title="Supprimer"
						onClick={() => product?.id !== undefined && handleDelete(product?.id)}
					/>
					</div>
				</div>
				<>
					<Accordion label="Résumé">
						{product?.desc}
					</Accordion>
					<Accordion label="Description">
						{product?.desc}
					</Accordion>
				</>
			</>
		}
		</div>
	)
}
