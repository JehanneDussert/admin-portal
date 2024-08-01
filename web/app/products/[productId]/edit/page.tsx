'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS } from '../../../constants/constants';
import { Product } from 'app/interfaces/Product';
import { useRouter } from 'next/navigation';
import Button from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import {
	useFetch,
	useInputValidation,
	useResizeTextArea,
} from '../../../hooks/hooks';
import { Notice } from '@codegouvfr/react-dsfr/Notice';
import { defaultProduct } from 'app/interfaces/DefaultValues';

export default function Edit({ params }: { params: { productId: number } }) {
	const [product, setProduct] = useState<Product>(defaultProduct);
	const [error, setError] = useState<Error | null>(null);
	const { states, visibility, validateField } = useInputValidation();
	const resumeTextAreaRef = useResizeTextArea(product.resume);
	const descTextAreaRef = useResizeTextArea(product.desc);
	const router = useRouter();

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

	const updateProduct = async () => {
		try {
			await useFetch({
				url: GET_ALL_PRODUCTS + `/${params.productId}`,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...product }),
			});
		} catch (error) {
			setError(error as Error);
		}

		router.push(`/products/${product?.id}`);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct((prevProduct: Product) => ({
			...prevProduct,
			[e.target.name]: e.target.value,
		}));
		validateField(e.target.name, e.target.value);
	};

	const handleTextAreaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setProduct((prevProduct: Product) => ({
			...prevProduct,
			[e.target.name]: e.target.value,
		}));
		validateField(e.target.name, e.target.value);
	};

	useEffect(() => {
		if (error) {
			throw new Error(`erreur au chargement du produit à éditer.`);
		}
	}, [error]);

	return (
		<div className="fr-grid-col">
			<Notice
				className="fr-mb-2w"
				title="Vous êtes en mode édition, pensez à sauvegarder vos modifications avant de quitter."
			/>
			<Input
				data-testid="price-input"
				label="Prix du produit"
				nativeInputProps={{
					name: 'price',
					value: product?.price,
					onChange: handleInputChange,
				}}
				state={states.price}
				stateRelatedMessage="Veuillez saisir un montant correct."
			/>
			<Input
				data-testid="title-input"
				label="Nom du produit"
				nativeInputProps={{
					name: 'title',
					value: product?.title,
					onChange: handleInputChange,
				}}
				state={states.title}
				stateRelatedMessage="Veuillez saisir un nom de produit."
			/>
			<Input
				data-testid="resume-input"
				label="Résumé du produit"
				textArea
				nativeTextAreaProps={{
					name: 'resume',
					value: product?.resume,
					onChange: handleTextAreaChange,
					ref: resumeTextAreaRef,
				}}
				state={states.resume}
				stateRelatedMessage="Veuillez saisir un résumé correct."
			/>
			<Input
				data-testid="desc-input"
				label="Description du produit"
				textArea
				nativeTextAreaProps={{
					name: 'desc',
					value: product?.desc,
					onChange: handleTextAreaChange,
					ref: descTextAreaRef,
				}}
				state={states.desc}
				stateRelatedMessage="Veuillez saisir une description correcte."
			/>
			<Button
				data-testid="validate-inputs-button"
				disabled={visibility}
				iconId="fr-icon-save-fill"
				onClick={updateProduct}
			>
				Enregistrer les modifications
			</Button>
		</div>
	);
}
