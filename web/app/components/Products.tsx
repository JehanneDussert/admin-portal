import Badge from '@codegouvfr/react-dsfr/Badge';
import Card from '@codegouvfr/react-dsfr/Card';
import Tag from '@codegouvfr/react-dsfr/Tag';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductsProps } from 'app/interfaces/ComponentsProps';

export const Products: React.FC<ProductsProps> = ({
	products,
	severity,
	badgeTitle,
	buttonTitle,
	handleClick,
}) => {
	const router = useRouter();

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
								<Badge noIcon severity={severity}>
									{badgeTitle}
								</Badge>
							}
							desc={product.desc}
							start={
								<ul className="fr-tags-group">
									<li>
										<Tag>{product.price} €</Tag>
									</li>
									<li>
										<Tag>
											Note moyenne :{' '}
											{product.average_rate} / 5
										</Tag>
									</li>
								</ul>
							}
							footer={
								<ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg">
									<li>
										<button
											id={product.title}
											data-testid={
												!product.is_deleted &&
												`edit-button-${product.id}`
											}
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
											// data-testid={`delete-button-${product.id}`}
											className="fr-btn fr-btn--secondary"
											onClick={() =>
												handleClick(product.id)
											}
										>
											{buttonTitle}
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
