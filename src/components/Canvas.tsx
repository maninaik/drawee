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
import { ToolType, ElementType, ActionType } from '@/types'
import { useHistory } from '@/hooks/useHistory'
import { createElement } from '@/utils/create-element'
import { drawElement } from '@/utils/draw-element'

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
	const [selectedElement, setSelectedElement] = useState<ElementType | null>(
		null
	)

	const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (action === 'writing') return

		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		if (selectedTool === 'text') {
			setAction('writing')
		} else {
			setAction('drawing')
		}

		switch (selectedTool) {
			case 'rectangle':
			case 'text':
			case 'circle': {
				const { clientX, clientY } = event

				const newElement = createElement({
					id: elements.length,
					x1: clientX,
					y1: clientY,
					x2: clientX,
					y2: clientY,
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
	}

	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (action !== 'drawing') return

		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		if (!selectedElement) return

		const rect = canvas.getBoundingClientRect()
		const x2 = event.clientX - rect.left
		const y2 = event.clientY - rect.top

		const newElements = [...elements]
		switch (selectedTool) {
			case 'rectangle':
				newElements[selectedElement.id].x2 = x2
				newElements[selectedElement.id].y2 = y2
				setElements(newElements, true)
				break
			case 'circle':
				newElements[selectedElement.id].x2 = x2
				newElements[selectedElement.id].y2 = y2
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
		const newElements = [...elements]
		const textWidth = ctx.measureText(text).width
		newElements[selectedElement.id].text = text
		newElements[selectedElement.id].x2 =
			newElements[selectedElement.id].x1 + textWidth
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
			requestAnimationFrame(() => {
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
