const BACKEND_URL: string = 'https://localhost:5001/api/';

export const get = (endpoint: string): any => {
	return fetch(`${BACKEND_URL}${endpoint}`)
		.then((r) => r.json())
		.catch((error: any) => console.error(error));
};
