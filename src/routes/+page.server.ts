export async function load() {
	return {
		columns: [
			{
				id: 1,
				title: 'In Progress',
				description: 'Tasks in progress.'
			},
			{
				id: 2,
				title: 'Stashed',
				description: 'Tasks in stash.'
			},
			{
				id: 3,
				title: 'Completed',
				description: 'Completed tasks.'
			}
		],
		cards: [
			{
				id: 11,
				title: 'Task-1',
				column: 1
			},
			{
				id: 22,
				title: 'Task-2',
				column: 1
			},
			{
				id: 33,
				title: 'Task-3',
				column: 2
			},
			{
				id: 44,
				title: 'Task-4',
				column: 2
			},
			{
				id: 55,
				title: 'Task-5',
				column: 2
			},
			{
				id: 66,
				title: 'Task-6',
				column: 3
			}
		]
	};
}
