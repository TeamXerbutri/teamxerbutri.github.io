// TODO: This only works with separate API, because all calls are redirected to index.html and return ok response.
export const urlExists = async (url) => {
	const response = await fetch(url, { method: 'HEAD' });
	return response.ok;
}