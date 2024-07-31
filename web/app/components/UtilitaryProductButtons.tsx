import React from 'react';
import { useFetch } from '../hooks/hooks';
import { DELETE_PRODUCT_BY_ID } from '../constants/constants';
import Button from '@codegouvfr/react-dsfr/Button';
import { useRouter } from 'next/navigation';
import { Product } from 'app/interfaces/Product';

// Back home, modify, delete buttons

export const UtilitaryProductButtons: React.FC<{ product: Product }> = ({
	product,
}) => {
	const router = useRouter();

	const handleDelete = async (id: number) => {
		await useFetch({
			url: DELETE_PRODUCT_BY_ID + `/${id}`,
			method: 'DELETE',
		});

		router.push('/');
	};

	return (
		<div className="fr-grid-row fr-my-4w">
			<Button
				iconId="fr-icon-arrow-left-s-line"
				onClick={() => router.push('/')}
			>
				Retour
			</Button>
			<div className="fr-col">
				<div className="fr-grid-row fr-grid-row--right">
					<Button
						iconId="fr-icon-ball-pen-fill"
						priority="tertiary no outline"
						title="Modifier"
						linkProps={{
							href: `/products/${product.id}/edit`,
						}}
					/>
					<Button
						iconId="fr-icon-delete-fill"
						priority="tertiary no outline"
						title="Supprimer"
						onClick={() => handleDelete(product.id)}
					/>
				</div>
			</div>
		</div>
	);
};
