<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as dbAPI from '$lib/api/dbAPI';
	import type { Column } from '$lib/db/db';

	type parentProps = {
		dbUpdate: () => void;
		hasColumn: boolean;
		columnData: Column[] | undefined;
	};
	let { dbUpdate, hasColumn, columnData }: parentProps = $props();

	function addCard(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const title = (formData.get('title') as string) || '';
		if (!title) {
			showError('Title cannot be blank!');
			return;
		}
		dbAPI
			.addCard(formData)
			.then(() => {
				dbUpdate();
				showToast('New card added!');
				(event.target as HTMLFormElement).reset();
			})
			.catch(() => {
				console.error('Error adding card.');
			});
	}

	function addColumn(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const title = (formData.get('title') as string) || '';
		if (!title) {
			showError('Title cannot be blank!');
			return;
		}
		dbAPI
			.addColumn(formData)
			.then(() => {
				dbUpdate();
				showToast('New column added!');
				(event.target as HTMLFormElement).reset();
			})
			.catch(() => {
				console.error('Error adding column.');
			});
	}

	function showToast(message: string) {
		toast.success(message);
	}

	function showError(message: string) {
		toast.error(message);
	}
</script>

<main>
	<div class="rounded-lg bg-card p-4">
		<Tabs.Root value={hasColumn ? 'card' : 'column'}>
			<Tabs.List class="flex justify-evenly">
				{#if hasColumn}
					<Tabs.Trigger value="card" class="w-full">Card</Tabs.Trigger>
				{/if}
				<Tabs.Trigger value="column" class="w-full">Column</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="card">
				<Card.Root>
					<Card.Content class="space-y-2 p-4">
						<form onsubmit={addCard} class="flex flex-col gap-4">
							{#if columnData}
								<Select.Root>
									<Select.Trigger class="w-full">
										<Select.Value placeholder="Select a column" />
									</Select.Trigger>
									<Select.Content>
										{#each columnData as column}
											<Select.Item value={column.id}>{column.title}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							{/if}
							<Input name="title" placeholder="Card's title" />
							<Button type="submit">Save</Button>
						</form>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="column">
				<Card.Root>
					<Card.Content class="space-y-2 p-4">
						<form onsubmit={addColumn} class="flex flex-col gap-4">
							<Input name="title" placeholder="Column's title" />
							<Textarea name="description" placeholder="Description" />
							<Button type="submit">Save</Button>
						</form>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
	<Toaster />
</main>
