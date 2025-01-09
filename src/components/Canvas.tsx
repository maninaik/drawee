'use client'

import {
	forwardRef,
	useRef,
	ForwardedRef,
	useState,
	useLayoutEffect,
	useImperativeHandle,
	useEffect,
} from 'react'
import {
	ToolType,
	ElementType,
	ActionType,
	Tools,
	SelectedElementType,
} from '@/types'
import { useHistory } from '@/hooks/useHistory'
import { createElement } from '@/utils/create-element'
import { drawElement } from '@/utils/draw-element'
import { getElementAtPoint } from '@/utils/get-element-at-point'
import { positionToCursor } from '@/utils/position-to-cursor'
import { getResizedCordinates } from '@/utils/get-resized-cordinates'

interface CanvasProps {
	selectedTool: ToolType
}

export interface CanvasRef {
	clear: () => void
	undo: () => void
	redo: () => void
}

const Canvas = forwardRef(function Canvas(
	{ selectedTool }: CanvasProps,
	forwardedRef: ForwardedRef<CanvasRef>
) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const textInputRef = useRef<HTMLInputElement>(null)
	const { elements, setElements, undo, redo } = useHistory([])
	const [action, setAction] = useState<ActionType>('none')
	const [selectedElement, setSelectedElement] =
		useState<SelectedElementType | null>(null)
	const [dragOffset, setDragOffset] = useState<{
		x: number
		y: number
	} | null>(null)

	const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (action === 'writing') return

		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const { clientX: x, clientY: y } = event

		if (selectedTool === 'text') {
			setAction('writing')
		} else if (selectedTool === 'select') {
			const element = getElementAtPoint(x, y, elements)
			if (element) {
				setSelectedElement(element)
				setElements(prevElements => prevElements)

				if (element.position === 'inside') {
					setAction('moving')
					setDragOffset({
						x: x - element.x1,
						y: y - element.y1,
					})
				} else {
					setAction('resizing')
				}
			}
		} else {
			setAction('drawing')
		}

		switch (selectedTool) {
			case 'rectangle':
			case 'text':
			case 'circle': {
				const newElement = createElement({
					id: elements.length,
					x1: x,
					y1: y,
					x2: x,
					y2: y,
					text: '',
					tool: selectedTool,
				} as ElementType)
				setSelectedElement(newElement)
				setElements((prev: ElementType[]) => [...prev, newElement])
				break
			}
		}
	}

	const handleMouseUp = () => {
		if (action === 'writing') return

		setAction('none')
		setSelectedElement(null)
		setDragOffset(null)
	}

	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const { clientX: x, clientY: y } = event

		if (selectedTool === Tools.select) {
			const element = getElementAtPoint(x, y, elements)
			if (element) {
				canvas.style.cursor = positionToCursor(
					element.position as string
				) as string
			} else {
				canvas.style.cursor = 'default'
			}
		}

		const newElements = [...elements]

		if (action === 'moving' && selectedElement && dragOffset) {
			const {
				id,
				x1: oldX1,
				y1: oldY1,
				x2: oldX2,
				y2: oldY2,
			} = selectedElement
			const width = oldX2 - oldX1
			const height = oldY2 - oldY1

			const newX1 = x - dragOffset.x
			const newY1 = y - dragOffset.y

			newElements[id] = {
				...newElements[id],
				x1: newX1,
				y1: newY1,
				x2: newX1 + width,
				y2: newY1 + height,
			}
			setElements(newElements, true)
		}

		if (action === 'resizing' && selectedElement) {
			const {
				id,
				x1: oldX1,
				y1: oldY1,
				x2: oldX2,
				y2: oldY2,
				position,
			} = selectedElement

			const { x1, y1, x2, y2 } = getResizedCordinates(
				oldX1,
				oldY1,
				oldX2,
				oldY2,
				x,
				y,
				position ?? null
			)

			newElements[id] = {
				...newElements[id],
				x1,
				y1,
				x2,
				y2,
			}
			setElements(newElements, true)
		}

		if (action !== 'drawing') return
		if (!selectedElement) return

		switch (selectedTool) {
			case 'rectangle':
			case 'circle':
				newElements[selectedElement.id].x2 = x
				newElements[selectedElement.id].y2 = y
				setElements(newElements, true)
				break
			default:
				break
		}
	}

	const handleTextBlur = (
		event:
			| React.FocusEvent<HTMLInputElement>
			| React.KeyboardEvent<HTMLInputElement>
	) => {
		if (!selectedElement) return

		const ctx = canvasRef.current?.getContext('2d')
		if (!ctx) return

		const text = (event.target as HTMLInputElement).value.trim()
		ctx.font = '24px sans-serif'
		const newElements = [...elements]
		const textWidth = ctx.measureText(text).width
		newElements[selectedElement.id].text = text
		newElements[selectedElement.id].x2 =
			newElements[selectedElement.id].x1 + textWidth
		newElements[selectedElement.id].y2 =
			newElements[selectedElement.id].y1 + 24
		setElements(newElements, true)
		setAction('none')
		setSelectedElement(null)
	}

	useImperativeHandle(forwardedRef, () => ({
		clear: () => {
			setElements([])
		},
		undo: () => {
			undo()
		},
		redo: () => {
			redo()
		},
	}))

	useLayoutEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d')
		if (!ctx || !canvas) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		console.log(elements, 'elements')
		elements.forEach((element: ElementType) => {
			if (
				action === 'writing' &&
				selectedElement &&
				selectedElement.id === element.id
			)
				return
			drawElement(element, ctx)
		})
	}, [action, canvasRef, elements, selectedElement])

	useEffect(() => {
		if (action === 'writing' && selectedElement) {
			// Focus the text input after the canvas is rendered
			requestIdleCallback(() => {
				textInputRef.current?.focus()
			})
		}
	}, [action, selectedElement])

	return (
		<div className="flex-1">
			{action === 'writing' && (
				<input
					type="text"
					ref={textInputRef}
					className="absolute focus:outline-none font-sans text-2xl bg-transparent z-10"
					style={{
						top: selectedElement?.y1,
						left: selectedElement?.x1,
						fontSize: '24px',
					}}
					onBlur={handleTextBlur}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							handleTextBlur(event)
						}
					}}
				/>
			)}
			<canvas
				ref={canvasRef}
				className="border rounded-lg"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				width={window.innerWidth}
				height={window.innerHeight}
			/>
		</div>
	)
})

export default Canvas
