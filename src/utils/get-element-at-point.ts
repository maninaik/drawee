import { ElementType, PositionType } from '@/types'

export const getElementAtPoint = (
	x: number,
	y: number,
	elements: ElementType[]
):
	| (ElementType & {
			position: PositionType | null
	  })
	| null => {
	return (
		elements
			.map(element => ({
				...element,
				position: isPointInElement(x, y, element) ?? null,
			}))
			.find(element => element.position !== null) || null
	)
}

export const isPointInElement = (
	x: number,
	y: number,
	element: ElementType
): PositionType | null => {
	switch (element.tool) {
		case 'text':
			const insideText =
				x >= element.x1 &&
				x <= element.x2 &&
				y >= element.y1 &&
				y <= element.y2
					? 'inside'
					: null
			return insideText
		case 'circle':
			const { x1, y1, x2, y2 } = element
			const h = (x1 + x2) / 2
			const k = (y1 + y2) / 2

			const a = Math.abs(x2 - x1) / 2
			const b = Math.abs(y2 - y1) / 2

			const value = (x - h) ** 2 / a ** 2 + (y - k) ** 2 / b ** 2

			const inside = value <= 1
			return inside ? 'inside' : null
		case 'rectangle':
			const topLeft = nearPoint(
				x,
				y,
				element.x1,
				element.y1,
				'top-left'
			)
			const bottomRight = nearPoint(
				x,
				y,
				element.x2,
				element.y2,
				'bottom-right'
			)
			const topRight = nearPoint(
				x,
				y,
				element.x2,
				element.y1,
				'top-right'
			)
			const bottomLeft = nearPoint(
				x,
				y,
				element.x1,
				element.y2,
				'bottom-left'
			)
			const insideRectangle =
				x >= element.x1 &&
				x <= element.x2 &&
				y >= element.y1 &&
				y <= element.y2
					? 'inside'
					: null

			return (
				topLeft ||
				bottomRight ||
				topRight ||
				bottomLeft ||
				insideRectangle
			)
		default:
			return null
	}
}

const nearPoint = (
	x: number,
	y: number,
	pointX: number,
	pointY: number,
	position: PositionType
) => {
	return Math.abs(x - pointX) < 5 && Math.abs(y - pointY) < 5
		? position
		: null
}
