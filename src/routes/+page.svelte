<script lang="ts">
	// UI imports
	import * as Card from '$lib/components/ui/card';
	import AddScreen from '$lib/components/AddScreen/AddScreen.svelte';
	// dragEvent imports
	import { draggable, dropZone } from '$lib/utils/utils';

	export let data;
</script>

<main>
	<div class="mx-4 flex justify-center gap-4">
		{#each data.columns as column}
			{@const cards = data.cards.filter((c) => c.column === column.id)}
			<div
				class="w-full"
				use:dropZone={{
				ondropzone(cardId: string) {
					const card = data.cards.find((c) => c.id === Number(cardId));
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
						{#each cards as card}
							<div use:draggable={String(card.id)}>
								<Card.Content class="m-0 p-0">
									<Card.Root class="flex justify-between p-4">
										{card.title}
									</Card.Root>
								</Card.Content>
							</div>
						{/each}
					</div>
				</Card.Root>
			</div>
		{/each}
	</div>
	<AddScreen />
</main>
