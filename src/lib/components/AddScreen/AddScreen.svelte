<script lang="ts">
	// UI imports
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	// API imports
	import * as dbAPI from '$lib/api/dbAPI';

	function addCard(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		dbAPI
			.addCard(formData)
			.then(() => {
				alert('Card added successfully.');
				(event.target as HTMLFormElement).reset();
			})
			.catch(() => {
				alert('Error adding card.');
			});
	}

	function addColumn(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		dbAPI
			.addColumn(formData)
			.then(() => {
				alert('Column added successfully.');
				(event.target as HTMLFormElement).reset();
			})
			.catch(() => {
				alert('Error adding column.');
			});
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ class: 'absolute bottom-0 right-0 m-4 text-2xl' })}
		>+</Dialog.Trigger
	>
	<Dialog.Content>
		<Tabs.Root value="card">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="card">Card</Tabs.Trigger>
				<Tabs.Trigger value="column">Column</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="card">
				<Card.Root>
					<Card.Content class="space-y-2 p-4">
						<form onsubmit={addCard} class="flex flex-col gap-4">
							<Input name="title" placeholder="Card's title" />
							<Textarea name="notes" placeholder="Notes" />
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
