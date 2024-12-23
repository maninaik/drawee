'use client'

import { useRef, useState } from 'react'
import Toolbar from '@/components/Toolbar'
import Canvas from '@/components/Canvas'
import { ToolType } from '@/types'

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [selectedTool, setSelectedTool] = useState<ToolType>('circle')

	const clearCanvas = () => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		ctx.clearRect(0, 0, canvas.width, canvas.height)
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
