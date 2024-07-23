"use client";

import React, { useEffect, useState } from 'react'
import { GET_ALL_PRODUCTS } from '../../../../src/components/constants';
import { Product } from '../../../../src/components/interface';
import { useRouter } from 'next/navigation';
import Button from '@codegouvfr/react-dsfr/Button';
import { Input } from "@codegouvfr/react-dsfr/Input";
import { title } from 'process';

export default function EditView({ params }: {params: {productId: number }}) {
  const	[product, setProduct] = useState<Product>({
	title: '', 
	desc: '',
	id: 0,
});
  const	router = useRouter();

	useEffect(() => {
		fetch(GET_ALL_PRODUCTS + `/${params.productId}`)
		.then(res => res.json())
		.then(data => setProduct(data));
	}, [])

	const updateProduct = () => {
		fetch(GET_ALL_PRODUCTS + `/${params.productId}`, { 
			method: 'PUT', 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...product }) 
		})
		.then(res => res.json())
		.then(() => router.push(`/products/${product?.id}`));
	}

	const handleChange = (e) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			[e.target.name]: e.target.value
		}))
	}

  return (
		<div className='fr-grid-col'>
            <Button
                iconId="fr-icon-save-fill"
                onClick={updateProduct}
                priority="tertiary no outline"
                title="Modifier"
			/>
       <Input
			label="Nom du produit"
			nativeInputProps={{
				name: 'title',
				value: product?.title,
				onChange: handleChange
			}}
		/>
       <Input
			label="Résumé du produit"
			textArea
			nativeTextAreaProps={{
				name: 'desc',
				value: product?.desc,
				onChange: handleChange
			}}
		/>
       {/* <Input
			label="Description du produit"
			textArea
			nativeTextAreaProps={{
				name: 'desc',
				value: product?.desc,
				onChange: handleChange
			}}
		/> */}
		</div>
	)
}
