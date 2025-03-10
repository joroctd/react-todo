const baseUrl = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

export default async ({
	options = { method: 'GET' },
	dataCallback = () => {},
	errorCallback = () => {},
	body,
	id,
	userId
}) => {
	if (!userId) throw new Error('Error: Authentication error!');

	const expandedOptions = {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
		}
	};
	if (body) {
		body.userId = userId;
		expandedOptions.body = JSON.stringify({ fields: body });
	}
	let requestUrl = baseUrl;
	if (id) requestUrl += `/${id}`;

	if (options.method === 'GET') {
		requestUrl += `?filterByFormula=userId = '${userId}'`;
	}

	try {
		const response = await fetch(requestUrl, expandedOptions);
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const data = await response.json();
		dataCallback(data);
	} catch ({ message }) {
		console.error(message);
		errorCallback(message);
	}
};
