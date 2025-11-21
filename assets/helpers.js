export const parallel = async (task1, task2) => {
	return {
		result1: await task1,
		result2: await task2
	}
}

class ResponseError extends Error {
	constructor(message, res) {
		super();
		this.response = res;
	}
}

export async function get(path) {
	const res = await fetch(path);
	
	if (!res.ok) {
		throw new ResponseError('An error occurred in fetch', res);
	}
	
	return res;
}