export const positionToCursor = (position: string) => {
	switch (position) {
		case 'top-left':
		case 'bottom-right':
			return 'nwse-resize'
		case 'top-right':
		case 'bottom-left':
			return 'nesw-resize'
		case 'inside':
			return 'move'
		default:
			return 'default'
	}
}
