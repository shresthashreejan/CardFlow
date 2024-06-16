<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<nav>
	<h1 class="p-4 text-3xl font-semibold uppercase">CardFlow</h1>
</nav>

<ModeWatcher />
<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
</style>
