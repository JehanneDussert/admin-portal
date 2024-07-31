import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/hooks';
import {
	UPDATE_REDO_PRODUCT,
	UPDATE_RESTORE_PRODUCT,
} from '../constants/constants';
import Button from '@codegouvfr/react-dsfr/Button';
import { UndoRedoButtonsProps } from 'app/interfaces/ComponentsProps';
import { setAllProductsFromData } from 'app/utils/utils';

export const UndoRedoButtons: React.FC<UndoRedoButtonsProps> = ({
	setAllProducts,
	undoVisibility,
	redoVisibility,
	productId,
}) => {
	const [error, setError] = useState<Error | null>(null);
	const [errorMsg, setErrorMsg] = useState<string>('');

	const handleRedo = async () => {
		try {
			const data = await useFetch({
				url: UPDATE_REDO_PRODUCT,
				method: 'POST',
			});

			setAllProductsFromData(data, setAllProducts);
		} catch (error) {
			setError(error as Error);
			setErrorMsg(
				'erreur lors de la tentative de re-suppression du produit.',
			);
		}
	};

	const handleRestoreProducts = async (productId: number) => {
		try {
			const data = await useFetch({
				url: UPDATE_RESTORE_PRODUCT + `/${productId}`,
				method: 'POST',
			});

			setAllProductsFromData(data, setAllProducts);
		} catch (error) {
			setError(error as Error);
			setErrorMsg('erreur lors de la tentative de restauration produit.');
		}
	};

	useEffect(() => {
		if (error) {
			throw new Error(errorMsg);
		}
	}, [error]);

	return (
		<div>
			<Button
				iconId="fr-icon-arrow-go-back-fill"
				onClick={() => handleRestoreProducts(productId)}
				priority="tertiary no outline"
				title="Défaire"
				disabled={undoVisibility}
			/>
			<Button
				iconId="fr-icon-arrow-go-forward-fill"
				onClick={handleRedo}
				priority="tertiary no outline"
				title="Refaire"
				disabled={redoVisibility}
			/>
		</div>
	);
};
