import { ElementType, Tools } from '@/types'

export const createElement = (element: ElementType): ElementType => {
	const { id, x1, y1, x2, y2, text, tool } = element

	if (tool === Tools.rectangle || tool === Tools.circle) {
		const xMin = Math.min(x1, x2)
		const xMax = Math.max(x1, x2)
		const yMin = Math.min(y1, y2)
		const yMax = Math.max(y1, y2)

		return { id, x1: xMin, y1: yMin, x2: xMax, y2: yMax, text, tool }
	}

	return element
}
