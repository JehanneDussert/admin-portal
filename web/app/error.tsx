'use client';

import { useEffect } from 'react';
import { Error404 } from './components/Error404';

export default function NotFound({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.log('error ICI: ', error);
	});
	return <Error404 />;
}
