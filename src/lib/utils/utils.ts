export function draggable(node: HTMLElement, data: string) {
	let state = data;
	node.draggable = true;
	node.style.cursor = 'grab';

	function dragStart(e: DragEvent) {
		e.dataTransfer!.setData('text/plain', state);
	}
	node.addEventListener('dragstart', dragStart);

	return {
		update(data: string) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', dragStart);
		}
	};
}

export function dropZone(node: HTMLElement, options: { ondropzone: (cardId: string) => void }) {
	let state = {
		dropEffect: 'move',
		...options
	};

	function dragOver(e: DragEvent) {
		e.preventDefault();
		const dropEffect = state.dropEffect as 'copy' | 'move' | 'none' | 'link';
		e.dataTransfer!.dropEffect = dropEffect;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const data = e.dataTransfer!.getData('text/plain');
		state.ondropzone(data);
	}

	node.addEventListener('dragover', dragOver);
	node.addEventListener('drop', handleDrop);

	return {
		update(options: { ondropzone: (cardId: string) => void }) {
			state = {
				dropEffect: 'move',
				...options
			};
		},
		destroy() {
			node.removeEventListener('dragover', dragOver);
			node.removeEventListener('drop', handleDrop);
		}
	};
}
