import { ElementType } from '@/types'

export const getElementAtPoint = (
	x: number,
	y: number,
	elements: ElementType[]
) => {
	return elements
		.map(element => ({
			...element,
			selectPosition: isPointInElement(x, y, element) ?? null,
		}))
		.find(element => element.selectPosition !== null)
}

export const isPointInElement = (
	x: number,
	y: number,
	element: ElementType
) => {
	switch (element.tool) {
		case 'text':
			const insideText =
				x >= element.x1 &&
				x <= element.x2 &&
				y >= element.y1 &&
				y <= element.y2
					? 'inside'
					: null
			console.log(insideText, 'inside text')
			return insideText
		case 'circle':
			return (
				Math.sqrt((x - element.x1) ** 2 + (y - element.y1) ** 2) <=
				Math.abs(element.x2 - element.x1) / 2
			)
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
			const insideRectangle =
				x >= element.x1 &&
				x <= element.x2 &&
				y >= element.y1 &&
				y <= element.y2
					? 'inside'
					: null

			return topLeft || bottomRight || insideRectangle
	}
}

const nearPoint = (
	x: number,
	y: number,
	pointX: number,
	pointY: number,
	position: string
) => {
	return Math.abs(x - pointX) < 5 && Math.abs(y - pointY) < 5
		? position
		: null
}
