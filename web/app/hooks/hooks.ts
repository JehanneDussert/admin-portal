import { defaultSeverityStates } from 'app/interfaces/DefaultValues';
import { fetchProps } from 'app/interfaces/Hooks';
import { Severity, SeverityStates } from 'app/interfaces/Product';
import { useEffect, useRef, useState } from 'react';

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
		throw error;
	}
};

// resize textArea when input is too long
export const useResizeTextArea = (value: string) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = 'auto';
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	}, [value]);

	return textAreaRef;
};

// check if fields are correctly set
export const useInputValidation = () => {
	const [states, setStates] = useState<SeverityStates>(defaultSeverityStates);
	const [visibility, setVisibility] = useState<boolean>(false);

	const validateField = (name: string, value: string) => {
		let state: Severity = 'default';

		if (
			name === 'price' &&
			(isNaN(+value) || value.length === 0 || +value <= 0)
		)
			state = 'error';
		else if (value.length === 0) state = 'error';

		setStates((prevStates) => {
			const newStates = {
				...prevStates,
				[name]: state,
			};

			const hasError = Object.values(newStates).some(
				(state) => state === 'error',
			);
			setVisibility(hasError);

			return newStates;
		});
	};

	return { states, visibility, validateField };
};
