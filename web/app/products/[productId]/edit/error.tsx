'use client';

import React from 'react';
import { Error404 } from '../../../components/Error404';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
	return <Error404 error={error} reset={reset}/>;
}
