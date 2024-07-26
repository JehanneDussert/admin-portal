import React from 'react';
import Card from '@codegouvfr/react-dsfr/Card';
import { useRouter } from 'next/navigation';
import { useFetch } from '../utils/hooks';
import { DELETE_PRODUCT_BY_ID, GET_DELETED_PRODUCTS } from '../utils/constants';
import { ProductsListProps } from 'app/interfaces/ComponentsProps';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { getSeverity } from 'app/utils/utils';
import { Tag } from '@codegouvfr/react-dsfr/Tag';

export const ProductsList: React.FC<ProductsListProps> = ({
	products,
	setProducts,
	setDeletedProducts,
}) => {
	const router = useRouter();

	const handleDelete = async (id: number) => {
		const updatedProducts = await useFetch({
			url: DELETE_PRODUCT_BY_ID + `/${id}`,
			method: 'DELETE',
		});
		const updatedDeletedProducts = await useFetch({
			url: GET_DELETED_PRODUCTS,
			method: 'GET',
		});

		setProducts(updatedProducts);
		setDeletedProducts(updatedDeletedProducts);
	};

	// TODO: display deleted products?
	return (
		<div
			data-testid="products-list"
			className="fr-grid-row fr-grid-row--gutters fr-my-2w"
		>
			{products &&
				products.map((product, index) => (
					<div className="fr-col-4" key={index}>
						<Card
							background
							border
							badge={
								<Badge
									noIcon
									severity={getSeverity(product.average_rate)}
								>
									Note moyenne : {product.average_rate} / 5
								</Badge>
							}
							desc={product.desc}
							start={<ul className="fr-tags-group"><li><Tag>{product.price} €</Tag></li></ul>}
							footer={
								<ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg">
									<li>
										<button
											id={product.title}
											data-testid={`edit-button-${product.id}`}
											onClick={() =>
												router.push(
													`/products/${product?.id}/edit`,
												)
											}
											className="fr-btn"
										>
											Modifier
										</button>
									</li>
									<li>
										<button
											data-testid={`delete-button-${product.id}`}
											className="fr-btn fr-btn--secondary"
											onClick={() =>
												handleDelete(product.id)
											}
										>
											Supprimer
										</button>
									</li>
								</ul>
							}
							imageAlt="texte alternatif de l’image"
							imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
							linkProps={{
								href: `/products/${product.id}`,
							}}
							size="medium"
							title={product.title}
							titleAs="h3"
						/>
					</div>
				))}
		</div>
	);
};
