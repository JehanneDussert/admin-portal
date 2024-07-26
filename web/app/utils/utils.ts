export const getSeverity = (average_rate: number) => {
	const severity = average_rate > 2.5 ? 'success' : 'error';

	return severity;
};
