<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	export let data;
</script>

<main class="m-4 flex justify-center gap-4">
	{#each data.columns as column}
		{@const cards = data.cards.filter((c) => c.column === column.id)}
		<Card.Root class="w-1/3">
			<Card.Header>
				<Card.Title>{column.title}</Card.Title>
				<Card.Description>{column.description}</Card.Description>
			</Card.Header>
			{#each cards as card}
				<Card.Content>
					<Card.Root class="flex justify-between p-4">
						{card.title}
					</Card.Root>
				</Card.Content>
			{/each}
		</Card.Root>
	{/each}
</main>
