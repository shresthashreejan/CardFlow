import { db } from '$lib/db/db';

async function addColumn(title: string, description: string) {
	try {
		await db.columns.add({
			title: title,
			description: description
		});
	} catch (error) {
		console.error(error);
	}
}

async function addCard(column: number, title: string, notes: string) {
	try {
		await db.cards.add({
			column: column,
			title: title,
			notes: notes
		});
	} catch (error) {
		console.error(error);
	}
}

export { addColumn, addCard };
