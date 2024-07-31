import React from 'react';
import Card from '@codegouvfr/react-dsfr/Card';
import { dateOptions } from 'app/constants/DefaultValues';
import { Review } from 'app/interfaces/Product';

export const Reviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
	return (
		<div>
			<h6 className="fr-my-2w">Avis clients ({reviews.length})</h6>
			{reviews &&
				reviews.map((review, index) => (
					<div className="fr-py-1w" key={index}>
						<Card
							background
							border
							desc={review.desc}
							size="medium"
							title={
								<div className="fr-grid-col">
									<div className="fr-grid-row">
										<h4 className="fr-col">
											{review.title}
										</h4>
										<h4>
											{review.rate} / 5{' '}
											<span
												className="fr-icon-star-fill"
												aria-hidden="true"
											></span>
										</h4>
									</div>
									<p className="fr-text--xs">
										Avis posté le{' '}
										{new Date(
											review.date,
										).toLocaleDateString(
											undefined,
											dateOptions,
										)}
									</p>
								</div>
							}
							titleAs="h3"
						/>
					</div>
				))}
		</div>
	);
};
