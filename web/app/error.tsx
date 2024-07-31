'use client';

import React from 'react';
import { Error404 } from './components/Error404';

export default function NotFound({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <Error404 reset={reset} error={error} />;
}
