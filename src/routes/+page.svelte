<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import AddModal from '$lib/components/AddModal/AddModal.svelte';

	import { draggable, dropZone } from '$lib/utils/utils';
	import * as dbAPI from '$lib/api/dbAPI';

	export let data;
	let loading = data && data.columns ? false : true;

	async function dbUpdate() {
		let columns = await dbAPI.fetchColumns();
		let cards = await dbAPI.fetchCards();
		data = { columns, cards };
	}
</script>

<main>
	<div class="mx-4 flex justify-start gap-4">
		{#if !loading}
			{#if data.columns && data.columns.length !== 0}
				{#each data.columns as column}
					{@const cards = data.cards?.filter((c) => c.column === column.id)}
					<div
						class="w-full"
						use:dropZone={{
					ondropzone(cardId: string) {
						const card = data.cards?.find((c) => c.id === Number(cardId));
						if (card) {
							card.column = column.id;
						}
					}
				}}
					>
						<Card.Root>
							<Card.Header>
								<Card.Title>{column.title}</Card.Title>
								<Card.Description>{column.description}</Card.Description>
							</Card.Header>

							<div class="flex flex-col gap-4 p-4">
								{#if cards}
									{#each cards as card}
										<div use:draggable={String(card.id)}>
											<Card.Content class="m-0 p-0">
												<Card.Root class="flex justify-between p-4">
													{card.title}
												</Card.Root>
											</Card.Content>
										</div>
									{/each}
								{/if}
							</div>
						</Card.Root>
					</div>
				{/each}
			{:else}
				<div class="text-2xl">Get started with a new column!</div>
			{/if}
		{/if}
	</div>
	<AddModal {dbUpdate} hasColumn={data.columns && data.columns.length !== 0 ? true : false} />
</main>
