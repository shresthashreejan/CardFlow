import * as dbAPI from '$lib/api/dbAPI';

export async function load() {
	let columns = await dbAPI.fetchColumns();
	let cards = await dbAPI.fetchCards();

	return {
		columns: columns,
		cards: cards
	};
}
