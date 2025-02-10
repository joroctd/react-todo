const baseUrl = `https://api.airtable.com/v0/${
	import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

export default async ({
	options = { method: 'GET' },
	dataCallback = () => {},
	errorCallback = () => {},
	body,
	id,
	queries = [],
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
		queries.unshift({ filterByFormula: `userId = '${userId}'` });
	}
	if (queries.length) {
		requestUrl += '?';
		queries.forEach((query, index) => {
			for (const name in query) {
				const value = query[name];
				requestUrl += `${name}=${value}`;
			}
			if (index < queries.length - 1) requestUrl += '&';
		});
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
