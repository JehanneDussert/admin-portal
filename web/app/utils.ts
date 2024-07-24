import { fetchProps } from './interfaces';

export const useFetch = async (props: fetchProps) => {
	const { url, method, headers, body } = props;

	try {
		const response = await fetch(url, {
			method: method,
			headers: headers,
			body: body,
		});

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(`Failed to fetch: ${response.statusText}`);
		}
	} catch (error) {
		console.error('Error: ', error);
	}
};
