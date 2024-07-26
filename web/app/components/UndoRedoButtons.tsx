import React from 'react';
import { useFetch } from '../utils/hooks';
import {
	GET_DELETED_PRODUCTS,
	GET_REDO_PRODUCTS,
	UPDATE_REDO_PRODUCT,
	UPDATE_RESTORE_PRODUCT,
} from '../utils/constants';
import Button from '@codegouvfr/react-dsfr/Button';
import { UndoRedoButtonsProps } from 'app/interfaces/ComponentsProps';

export const UndoRedoButtons: React.FC<UndoRedoButtonsProps> = ({
	setProducts,
	setDeletedProducts,
	setRedoProducts,
	undoDisability,
	redoDisability,
}) => {
	const handleRestoreProducts = async () => {
		const updatedProducts = await useFetch({
			url: UPDATE_RESTORE_PRODUCT,
			method: 'POST',
		});
		const updatedDeletedProducts = await useFetch({
			url: GET_DELETED_PRODUCTS,
			method: 'GET',
		});
		const updatedRedoProducts = await useFetch({
			url: GET_REDO_PRODUCTS,
			method: 'GET',
		});

		setProducts(updatedProducts);
		setDeletedProducts(updatedDeletedProducts);
		setRedoProducts(updatedRedoProducts);
	};

	const handleRedo = async () => {
		const updatedProducts = await useFetch({
			url: UPDATE_REDO_PRODUCT,
			method: 'POST',
		});
		const updatedRedoProducts = await useFetch({
			url: GET_REDO_PRODUCTS,
			method: 'GET',
		});
		const updatedDeletedProducts = await useFetch({
			url: GET_DELETED_PRODUCTS,
			method: 'GET',
		});

		setProducts(updatedProducts);
		setDeletedProducts(updatedDeletedProducts);
		setRedoProducts(updatedRedoProducts);
	};

	return (
		<div className="">
			<Button
				iconId="fr-icon-arrow-go-back-fill"
				onClick={handleRestoreProducts}
				priority="tertiary no outline"
				title="Défaire"
				disabled={undoDisability}
			/>
			<Button
				iconId="fr-icon-arrow-go-forward-fill"
				onClick={handleRedo}
				priority="tertiary no outline"
				title="Refaire"
				disabled={redoDisability}
			/>
		</div>
	);
};
