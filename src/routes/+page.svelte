<script lang="ts">
	import AddModal from '$lib/components/AddModal/AddModal.svelte';
	import ThemeController from '$lib/components/ThemeController/ThemeController.svelte';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import { CircleMinus } from 'lucide-svelte';
	import { Plus } from 'lucide-svelte';
	import { draggable, dropZone } from '$lib/utils/dragEventUtils';
	import * as dbAPI from '$lib/api/dbAPI';

	let { data } = $props();
	let loading = data && data.columns ? false : true;
	let showModal: boolean = $state(false);

	function setShowModal() {
		showModal = !showModal;
		if (!showModal) {
			location.reload();
		}
	}

	async function dbUpdate() {
		let columns = await dbAPI.fetchColumns();
		let cards = await dbAPI.fetchCards();
		data = { columns, cards };
	}

	async function deleteColumn(e: MouseEvent) {
		let columnId = (e.target as HTMLButtonElement)?.dataset.columnid;
		if (columnId) {
			dbAPI.deleteColumn(columnId).then(() => {
				dbUpdate();
				showToast('Column deleted!');
			});
		}
	}

	async function deleteCard(e: MouseEvent) {
		let cardId = (e.target as HTMLButtonElement)?.dataset.cardid;
		if (cardId) {
			dbAPI.deleteCard(cardId).then(() => {
				dbUpdate();
				showToast('Card deleted!');
			});
		}
	}

	function showToast(message: string) {
		toast.success(message);
	}
</script>

<main>
	<div class="flex flex-col justify-start gap-4 overflow-auto px-4 pb-4 xl:flex-row">
		{#if !loading}
			{#if data.columns && data.columns.length !== 0}
				{#each data.columns as column}
					{@const cards = data.cards?.filter((c) => c.column === column.id)}
					<div
						class="min-w-full xl:min-w-[20vw] xl:max-w-[20vw]"
						data-columnid={column.id}
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
								<Card.Title class="flex items-center justify-between break-all">
									{column.title}
									<CircleMinus
										class="z-100 cursor-pointer"
										onclick={deleteColumn}
										data-columnid={column.id}
									/>
								</Card.Title>
								{#if column.description}
									<Card.Description>{column.description}</Card.Description>
								{/if}
							</Card.Header>

							<div class="flex flex-col gap-4 px-4 pb-4">
								{#if cards}
									{#each cards as card}
										<div use:draggable={String(card.id)} class="transition-all hover:scale-95">
											<Card.Content class="m-0 p-0">
												<Card.Root class="flex items-center justify-between break-all p-4">
													<div class="w-[90%]">
														{card.title}
													</div>
													<CircleMinus
														class="z-100 cursor-pointer"
														onclick={deleteCard}
														data-cardid={card.id}
													/>
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
	<div class="absolute right-0 top-0 flex items-center gap-4 p-4">
		<ThemeController />
		<Button onclick={setShowModal}><Plus onclick={setShowModal} /></Button>
	</div>
	{#if showModal}
		<div
			class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 dark:bg-white dark:bg-opacity-20"
			onclick={setShowModal}
		>
			<div class="mx-4 w-full lg:mx-0 lg:w-1/3" onclick={(e) => e.stopPropagation()}>
				<AddModal
					{dbUpdate}
					hasColumn={data.columns && data.columns.length !== 0 ? true : false}
					columnData={data.columns}
				/>
			</div>
		</div>
	{/if}
	<Toaster />
</main>
