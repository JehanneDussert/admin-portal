'use client';

import { Error404 } from 'app/components/Error404';
import React from 'react';

export default function NotFound({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <Error404 reset={reset} error={error} />;
}
