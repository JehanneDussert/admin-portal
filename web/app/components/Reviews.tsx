import React, { useEffect } from 'react';
import Card from '@codegouvfr/react-dsfr/Card';
import { ReviewsProps } from 'app/interfaces/ComponentsProps';

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return (
		<div className="fr-my-2w">
			{reviews &&
				reviews.map((review, index) => (
					<div className="fr-my-2w" key={index}>
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
											options,
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
