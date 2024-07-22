"use client";

import React, { useEffect, useState } from 'react'
import { GET_ALL_PRODUCTS, DELETE_PRODUCT_BY_ID } from '../../../src/components/constants';
import { Product } from '../../../src/components/interface';
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useRouter } from 'next/navigation';

export default function ProductInfos({ params }: {params: {productId: Number }}) {
  const	[product, setProduct] = useState<Product>();
  const	router = useRouter();

	useEffect(() => {
		fetch(GET_ALL_PRODUCTS + `/${params.productId}`)
		.then(res => res.json())
		.then(data => setProduct(data));
	}, [])

	const handleDelete = (id: number) => {
		console.log(id)
		fetch(DELETE_PRODUCT_BY_ID + `?product_id=${id}`, { method: 'DELETE' })
		.then(res => res.json())
		.then(() => router.push('/'));
	}

  return (
		<div className='fr-grid-col'>
		<h1>{product?.title}</h1>
		<ButtonsGroup
			buttons={[
			{
				children: 'Modifier',
				linkProps: {
				onClick: () => console.log('modifier'),
				href: '#'
				}
			},
			{
				children: 'Supprimer',
				linkProps: {
				href: '#',
				onClick: () => product?.id !== undefined && handleDelete(product?.id),
				},
				priority: 'secondary',
			},
			]}
		/>
		{
			product && 
			<>
				<Accordion label="Résumé">
					{product?.desc}
				</Accordion>
				<Accordion label="Description">
					{product?.desc}
				</Accordion>
			</>
		}
		</div>
	)
}
