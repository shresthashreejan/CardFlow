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
		const column = 1;
		const title = (formData.get('title') as string) || '';
		const notes = (formData.get('notes') as string) || '';

		await db.cards.add({
			column: column,
			title: title,
			notes: notes
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
