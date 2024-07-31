'use client';

import React from 'react';

export const Error404 = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<main role="main" id="content">
			<div className="fr-container">
				<div className="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
					<div className="fr-py-0 fr-col-12 fr-col-md-6">
						<h1>Page non trouvée</h1>
						<p className="fr-text--sm fr-mb-3w">Erreur 404</p>
						{error && (
							<div className="fr-text--sm fr-mb-5w">
								<p>Message : {error.message}</p>
								{error.digest && <p>Digest : {error.digest}</p>}
							</div>
						)}
						<p className="fr-text--lead fr-mb-3w">
							La page que vous cherchez est introuvable.
							Excusez-nous pour la gêne occasionnée.
						</p>
						<p className="fr-text--sm fr-mb-5w">
							Si vous avez tapé l&apos;adresse web dans le
							navigateur, vérifiez qu&apos;elle est correcte. La
							page n&apos;est peut-être plus disponible.
							<br />
							Dans ce cas, pour continuer votre visite vous pouvez
							consulter notre page d&apos;accueil, ou effectuer
							une recherche avec notre moteur de recherche en haut
							de page.
							<br />
							Sinon contactez-nous pour que l&apos;on puisse vous
							rediriger vers la bonne information.
						</p>
						<div className="fr-btns-group fr-btns-group--inline-md">
							<a className="fr-btn" href="/">
								Page d&apos;accueil
							</a>
							<button className="fr-btn" onClick={reset}>
								Réessayer
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
