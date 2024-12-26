export const Tools = {
	select: 'select',
	circle: 'circle',
	rectangle: 'rectangle',
	text: 'text',
}

export type ToolType = keyof typeof Tools

export type ElementType = {
	id: number
	x1: number
	y1: number
	x2: number
	y2: number
	text: string
	tool: ToolType
}

export type ActionType = 'drawing' | 'selecting' | 'writing' | 'none'
