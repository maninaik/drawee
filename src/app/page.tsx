'use client'

import { useRef, useState } from 'react'
import Toolbar from '@/components/Toolbar'
import Canvas, { CanvasRef } from '@/components/Canvas'
import { ToolType } from '@/types'

export default function Home() {
	const canvasRef = useRef<CanvasRef>(null)
	const [selectedTool, setSelectedTool] = useState<ToolType>('circle')

	const clearCanvas = () => {
		canvasRef.current?.clear()
	}

	return (
		<div className="flex min-h-screen">
			<Toolbar
				selectedShape={selectedTool}
				setSelectedShape={setSelectedTool}
				onClear={clearCanvas}
			/>
			<Canvas
				ref={canvasRef}
				selectedShape={selectedTool}
			/>
		</div>
	)
}
