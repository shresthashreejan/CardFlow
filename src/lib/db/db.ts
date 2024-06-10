import Dexie, { type EntityTable } from 'dexie';

interface Column {
	id: number;
	title: string;
	description: string;
}

interface Card {
	id: number;
	column: number;
	title: string;
	notes: string;
}

const db = new Dexie('CardFlowDB') as Dexie & {
	columns: EntityTable<Column, 'id'>;
	cards: EntityTable<Card, 'id'>;
};

db.version(1).stores({
	columns: '++id, title, description',
	cards: '++id, title, column'
});

export type { Column, Card };
export { db };
