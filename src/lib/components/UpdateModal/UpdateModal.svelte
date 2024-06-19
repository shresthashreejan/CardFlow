<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as dbAPI from '$lib/api/dbAPI';

	type parentProps = {
		dbUpdate: () => void;
		columnId: string;
		columnTitle: string;
		columnDescription: string;
	};
	let { columnId, columnTitle, columnDescription }: parentProps = $props();

	function editColumn(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const title = (formData.get('title') as string) || '';
		if (!title) {
			showError('Title cannot be blank!');
			return;
		}
		formData.append('columnid', columnId);
		formData.append('title', columnTitle);
		formData.append('description', columnDescription);
		dbAPI
			.updateColumn(formData)
			.then(() => {
				location.reload();
			})
			.catch(() => {
				console.error('Error adding column.');
			});
	}

	function showError(message: string) {
		toast.error(message);
	}
</script>

<main>
	<div class="rounded-lg bg-card p-4">
		<Tabs.Root value="column">
			<Tabs.List class="flex justify-evenly">
				<Tabs.Trigger value="column" class="w-full">Column</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="column">
				<Card.Root>
					<Card.Content class="space-y-2 p-4">
						<form onsubmit={editColumn} class="flex flex-col gap-4">
							<Input name="title" placeholder="Column's title" value={columnTitle} />
							<Textarea name="description" placeholder="Description" value={columnDescription} />
							<Button type="submit">Save</Button>
						</form>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
	<Toaster />
</main>
