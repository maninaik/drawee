import { ElementType } from '@/types'

export const drawElement = (
	element: ElementType,
	ctx: CanvasRenderingContext2D
) => {
	switch (element.tool) {
		case 'rectangle': {
			ctx.strokeRect(
				element.x1,
				element.y1,
				element.x2 - element.x1,
				element.y2 - element.y1
			)
			ctx.stroke()
			break
		}
		case 'circle': {
			const centerX = (element.x1 + element.x2) / 2
			const centerY = (element.y1 + element.y2) / 2
			const radiusX = Math.abs((element.x2 - element.x1) / 2)
			const radiusY = Math.abs((element.y2 - element.y1) / 2)
			ctx.beginPath()
			ctx.ellipse(
				centerX,
				centerY,
				radiusX,
				radiusY,
				0,
				0,
				2 * Math.PI
			)
			ctx.stroke()
			break
		}
		default: {
			throw new Error('Draw element: Invalid tool selected')
		}
	}
}
