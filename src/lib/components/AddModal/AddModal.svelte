<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Plus } from 'lucide-svelte';
	import * as dbAPI from '$lib/api/dbAPI';

	type parentProps = {
		dbUpdate: () => void;
		hasColumn: boolean;
	};
	let { dbUpdate, hasColumn }: parentProps = $props();

	function addCard(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
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
</script>

<main>
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants()}><Plus /></Dialog.Trigger>
		<Dialog.Content>
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
		</Dialog.Content>
	</Dialog.Root>
	<Toaster />
</main>
