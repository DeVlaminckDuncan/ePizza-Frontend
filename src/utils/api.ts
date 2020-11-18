const BACKEND_URL_LOCAL: string = process.env.VUE_APP_BACKEND_URL_LOCAL;
const BACKEND_URL_AZURE: string = process.env.VUE_APP_BACKEND_URL_AZURE;

export const get = (endpoint: string): any => {
	return fetch(`${BACKEND_URL_AZURE}${endpoint}`)
		.then((r) => r.json())
		.catch((error: any) => console.error(error));
};

export const post = (endpoint: string, payload: object): any => {
	try {
		return fetch(`${BACKEND_URL_AZURE}${endpoint}`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json',
			},
		});
	} catch (error) {
		return new Error(error);
	}
};
