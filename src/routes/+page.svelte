<script lang="ts">
	import AddModal from '$lib/components/AddModal/AddModal.svelte';
	import UpdateModal from '$lib/components/UpdateModal/UpdateModal.svelte';
	import ThemeController from '$lib/components/ThemeController/ThemeController.svelte';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CircleMinus, Menu } from 'lucide-svelte';
	import { Plus } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { draggable, dropZone } from '$lib/utils/dragEventUtils';
	import * as dbAPI from '$lib/api/dbAPI';

	let { data } = $props();
	let loading = data && data.columns ? false : true;
	let showModal: boolean = $state(false);
	let showUpdateModal: boolean = $state(false);
	let colId: string = $state('');
	let columnTitle: string = $state('');
	let columnDescription: string = $state('');

	function setShowModal() {
		showModal = !showModal;
		if (!showModal) {
			location.reload();
		}
	}

	function closeModal() {
		showUpdateModal = false;
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
				location.reload();
			});
		}
	}

	async function deleteCard(e: MouseEvent) {
		let cardId = (e.target as HTMLButtonElement)?.dataset.cardid;
		if (cardId) {
			dbAPI.deleteCard(cardId).then(() => {
				dbUpdate();
				location.reload();
			});
		}
	}

	async function editColumn(e: MouseEvent) {
		let columnId = (e.target as HTMLButtonElement)?.dataset.columnid;
		if (columnId) {
			let id = parseInt(columnId);
			let column = data.columns?.find((column) => column.id === id);
			colId = columnId;
			if (column?.title) {
				columnTitle = column.title;
			}
			if (column?.description) {
				columnDescription = column.description;
			}
		}
		showUpdateModal = true;
	}
</script>

<svelte:head>
	<title>CardFlow.</title>
</svelte:head>

<div class="absolute flex w-full items-center justify-between gap-4 p-4">
	<nav>
		<h1 class="text-3xl font-bold md:text-5xl">CardFlow.</h1>
	</nav>
	<div class="flex gap-4">
		<ThemeController />
		<Button onclick={setShowModal}><Plus onclick={setShowModal} /></Button>
	</div>
</div>

<main class="pt-20">
	<div class="flex min-h-screen flex-col justify-start gap-4 overflow-auto px-4 pb-4 xl:flex-row">
		{#if !loading}
			{#if data.columns && data.columns.length !== 0}
				{#each data.columns as column}
					{@const cards = data.cards?.filter((c) => c.column === column.id)}
					<div
						class="min-w-full xl:min-w-[15vw] xl:max-w-[15vw]"
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
							<Card.Header class="group">
								<Card.Title class="flex items-center justify-between break-words">
									<div>
										{column.title}
									</div>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild let:builder>
											<Button
												builders={[builder]}
												variant="ghost"
												class="px-2 opacity-0 transition-all group-hover:opacity-100"
												><Menu /></Button
											>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Group>
												<DropdownMenu.Item>
													<div
														onclick={editColumn}
														data-columnid={column.id}
														class="w-full cursor-pointer"
													>
														Edit
													</div>
												</DropdownMenu.Item>
												<DropdownMenu.Item>
													<div
														onclick={deleteColumn}
														data-columnid={column.id}
														class="w-full cursor-pointer"
													>
														Delete
													</div>
												</DropdownMenu.Item>
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
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
												<Card.Root class="group flex items-center justify-between break-words p-4">
													<div class="w-[90%]">
														{card.title}
													</div>
													<CircleMinus
														class="z-10 cursor-pointer opacity-0 transition-all group-hover:opacity-100"
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
	{#if showUpdateModal}
		<div
			class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 dark:bg-white dark:bg-opacity-20"
			onclick={closeModal}
		>
			<div class="mx-4 w-full lg:mx-0 lg:w-1/3" onclick={(e) => e.stopPropagation()}>
				<UpdateModal {dbUpdate} columnId={colId} {columnTitle} {columnDescription} />
			</div>
		</div>
	{/if}
</main>
