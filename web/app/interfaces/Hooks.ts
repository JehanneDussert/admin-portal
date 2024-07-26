export interface fetchProps {
	url: string;
	method?: string;
	headers?: HeadersInit | undefined;
	body?: string;
}