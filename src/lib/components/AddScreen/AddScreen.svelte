<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
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
						<div class="space-y-1">
							<Input id="cardtitle" placeholder="Title" />
						</div>
						<div class="space-y-1">
							<Textarea id="cardnotes" placeholder="Notes" />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button>Save</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="column">
				<Card.Root>
					<Card.Content class="space-y-2 p-4">
						<div class="space-y-1">
							<Input id="columntitle" placeholder="Title" />
						</div>
						<div class="space-y-1">
							<Textarea id="columndesc" placeholder="Description" />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button>Save</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</Dialog.Content>
</Dialog.Root>
