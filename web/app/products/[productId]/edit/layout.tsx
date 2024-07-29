import React, { PropsWithChildren } from 'react';

export default function layout({
	params,
	children,
}: PropsWithChildren<{
	params: { productId: string };
}>) {
	const productId = Number(params.productId);

	if (isNaN(productId)) {
		throw new Error(`Product does not exist`);
	}

	return <div className="fr-container fr-my-4w">{children}</div>;
}
