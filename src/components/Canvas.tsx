'use client'

import {
	forwardRef,
	useRef,
	ForwardedRef,
	useState,
	useLayoutEffect,
} from 'react'
import { ToolType, ElementType } from '@/types'
import { useHistory } from '@/hooks/useHistory'
import { createElement } from '@/utils/create-element'

interface CanvasProps {
	selectedShape: ToolType
}

const Canvas = forwardRef(function Canvas(
	{ selectedShape }: CanvasProps,
	forwardedRef: ForwardedRef<HTMLCanvasElement>
) {
	const localCanvasRef = useRef<HTMLCanvasElement>(null)
	const [isDrawing, setIsDrawing] = useState(false)
	const [selectedElement, setSelectedElement] = useState<ElementType | null>(
		null
	)
	const { elements, setElements } = useHistory([])

	const canvasRef =
		(forwardedRef as React.RefObject<HTMLCanvasElement>) || localCanvasRef

	const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		setIsDrawing(true)

		switch (selectedShape) {
			case 'rectangle':
			case 'circle': {
				const rect = canvas.getBoundingClientRect()
				const x = event.clientX - rect.left
				const y = event.clientY - rect.top

				const newElement = createElement({
					x1: x,
					y1: y,
					x2: x,
					y2: y,
					text: '',
					tool: selectedShape,
				} as ElementType)
				setElements((prev: ElementType[]) => [...prev, newElement])
				setSelectedElement(newElement)
				break
			}
		}
	}

	const handleMouseUp = () => {
		setIsDrawing(false)
	}

	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return

		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const rect = canvas.getBoundingClientRect()
		const x2 = event.clientX - rect.left
		const y2 = event.clientY - rect.top

		const newElements = [...elements]
		switch (selectedShape) {
			case 'rectangle':
				newElements[newElements.length - 1].x2 = x2
				newElements[newElements.length - 1].y2 = y2
				setElements(newElements)
				break
			case 'circle':
				newElements[newElements.length - 1].x2 = x2
				newElements[newElements.length - 1].y2 = y2
				setElements(newElements)
				break
			default:
				break
		}
	}

	useLayoutEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const drawElement = (element: ElementType) => {
			if (element.tool === 'rectangle') {
				ctx.strokeRect(
					element.x1,
					element.y1,
					element.x2 - element.x1,
					element.y2 - element.y1
				)
				ctx.stroke()
			}
			if (element.tool === 'circle') {
				const centerX = (element.x1 + element.x2) / 2
				const centerY = (element.y1 + element.y2) / 2
				const radiusX = (element.x2 - element.x1) / 2
				const radiusY = (element.y2 - element.y1) / 2
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
			}
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		console.log(elements, 'elements')
		elements.forEach((element: ElementType) => {
			drawElement(element)
		})
	}, [canvasRef, elements])

	return (
		<div className="flex-1">
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
