const BACKEND_URL_LOCAL: string = 'https://localhost:5001/api/';
const BACKEND_URL_AZURE: string = 'https://epizza.azurewebsites.net/api/';

export const get = (endpoint: string): any => {
	return fetch(`${BACKEND_URL_AZURE}${endpoint}`)
		.then((r) => r.json())
		.catch((error: any) => console.error(error));
};
