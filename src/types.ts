export const Tools: Record<string, string> = {
	circle: 'circle',
	rectangle: 'rectangle',
	text: 'text',
}

export type ToolType = keyof typeof Tools

export type ElementType = {
	x1: number
	y1: number
	x2: number
	y2: number
	text: string
	tool: ToolType
}
