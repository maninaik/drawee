import { PositionType } from '@/types'

export function getResizedCordinates(
	oldX1: number,
	oldY1: number,
	oldX2: number,
	oldY2: number,
	x: number,
	y: number,
	position: PositionType | null
) {
	if (!position) return { x1: oldX1, y1: oldY1, x2: oldX2, y2: oldY2 }

	if (position === 'top-left') {
		return { x1: x, y1: y, x2: oldX2, y2: oldY2 }
	}

	if (position === 'top-right') {
		return { x1: oldX1, y1: y, x2: x, y2: oldY2 }
	}

	if (position === 'bottom-left') {
		return { x1: x, y1: oldY1, x2: oldX2, y2: y }
	}

	if (position === 'bottom-right') {
		return { x1: oldX1, y1: oldY1, x2: x, y2: y }
	}

	return { x1: oldX1, y1: oldY1, x2: x, y2: y }
}
