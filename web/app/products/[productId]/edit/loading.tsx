import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
	return (
		<Box className="fr-grid-row--center fr-py-15w" sx={{ display: 'flex' }}>
			<CircularProgress />
		</Box>
	);
}
