'use client'

import {
	forwardRef,
	useRef,
	ForwardedRef,
	useState,
	useLayoutEffect,
	useImperativeHandle,
} from 'react'
import { ToolType, ElementType } from '@/types'
import { useHistory } from '@/hooks/useHistory'
import { createElement } from '@/utils/create-element'
import { drawElement } from '@/utils/draw-element'

interface CanvasProps {
	selectedShape: ToolType
}

export interface CanvasRef {
	clear: () => void
}

const Canvas = forwardRef(function Canvas(
	{ selectedShape }: CanvasProps,
	forwardedRef: ForwardedRef<CanvasRef>
) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [isDrawing, setIsDrawing] = useState(false)
	const { elements, setElements } = useHistory([])

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

	useImperativeHandle(forwardedRef, () => ({
		clear: () => {
			setElements([])
		},
	}))

	useLayoutEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d')
		if (!ctx || !canvas) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		elements.forEach((element: ElementType) => {
			drawElement(element, ctx)
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
