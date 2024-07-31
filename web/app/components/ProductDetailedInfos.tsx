import Accordion from '@codegouvfr/react-dsfr/Accordion';
import { Product } from 'app/interfaces/Product';
import React from 'react';

// Price, resume, description

export const ProductDetailedInfos: React.FC<{ product: Product }> = ({
	product,
}) => {
	return (
		<>
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
		</>
	);
};
