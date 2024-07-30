'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS } from '../../../constants/constants';
import { Product } from 'app/interfaces/Product';
import { useRouter } from 'next/navigation';
import Button from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { useFetch } from '../../../hooks/hooks';
import { Notice } from '@codegouvfr/react-dsfr/Notice';

type Severity = 'success' | 'error' | 'default';

export default function Edit({ params }: { params: { productId: number } }) {
	const [product, setProduct] = useState<Product>({
		title: '',
		desc: '',
		resume: '',
		id: -1,
		price: 0,
		average_rate: 0,
		reviews: [],
		last_modified: new Date(),
		is_deleted: false,
	});
	const router = useRouter();
	const [states, setStates] = useState({
		price: 'default' as Severity,
		title: 'default' as Severity,
		resume: 'default' as Severity,
		desc: 'default' as Severity,
	});
	const [visibility, setVisibility] = useState<boolean>(false);
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

	const validateField = (name: string, value: string) => {
		let state: Severity = 'default';

		if (
			name === 'price' &&
			(isNaN(+value) || value.length === 0 || +value <= 0)
		)
			state = 'error';
		else if (value.length === 0) state = 'error';

		setStates((prevStates) => {
			const newStates = {
				...prevStates,
				[name]: state,
			};

			const hasError = Object.values(newStates).some(
				(state) => state === 'error',
			);
			setVisibility(hasError);

			return newStates;
		});
	};

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
			throw new Error(`Error loading products`);
		}
	}, [error]);

	return (
		<div className="fr-grid-col">
			<Notice
				className="fr-mb-2w"
				title="Vous êtes en mode édition, pensez à sauvegarder vos modifications avant de quitter."
			/>
			<Input
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
				label="Résumé du produit"
				textArea
				nativeTextAreaProps={{
					name: 'resume',
					value: product?.resume,
					onChange: handleTextAreaChange,
				}}
				state={states.resume}
				stateRelatedMessage="Veuillez saisir un résumé correct."
			/>
			<Input
				label="Description du produit"
				textArea
				nativeTextAreaProps={{
					name: 'desc',
					value: product?.desc,
					onChange: handleTextAreaChange,
				}}
				state={states.desc}
				stateRelatedMessage="Veuillez saisir une description correcte."
			/>
			<Button
				disabled={visibility}
				iconId="fr-icon-save-fill"
				onClick={updateProduct}
			>
				Enregistrer les modifications
			</Button>
		</div>
	);
}
