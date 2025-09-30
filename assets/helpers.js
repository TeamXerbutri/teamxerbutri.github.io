export const urlExists = async (url) => {
	const response = await fetch(url, { method: 'HEAD' });
	console.log(response)
	return response.ok;
}