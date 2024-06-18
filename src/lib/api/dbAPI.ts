import { db } from '$lib/db/db';

export async function addColumn(formData: FormData) {
	try {
		const title = (formData.get('title') as string) || '';
		const description = (formData.get('description') as string) || '';

		await db.columns.add({
			title: title,
			description: description
		});
	} catch (error) {
		console.error(error);
	}
}

export async function addCard(formData: FormData) {
	try {
		const column = (formData.get('columnid') as string) || '';
		const title = (formData.get('title') as string) || '';

		await db.cards.add({
			column: parseInt(column),
			title: title
		});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchColumns() {
	try {
		return await db.columns.toArray();
	} catch (error) {
		console.error(error);
	}
}

export async function fetchCards() {
	try {
		return await db.cards.toArray();
	} catch (error) {
		console.error(error);
	}
}

export async function updateColumnAssignment(cardId: string, columnId: string) {
	try {
		db.cards.update(parseInt(cardId), { column: parseInt(columnId) });
	} catch (error) {
		console.error(error);
	}
}

export async function deleteColumn(columnId: string) {
	try {
		db.cards.filter((card) => card.column === parseInt(columnId)).delete();
		db.columns.delete(parseInt(columnId));
	} catch (error) {
		console.error(error);
	}
}

export async function deleteCard(cardId: string) {
	try {
		db.cards.delete(parseInt(cardId));
	} catch (error) {
		console.error(error);
	}
}
