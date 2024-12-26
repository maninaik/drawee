'use client'

import { useRef, useState } from 'react'
import Toolbar from '@/components/Toolbar'
import Canvas, { CanvasRef } from '@/components/Canvas'
import { ToolType } from '@/types'
import ActionBar from '@/components/ActionBar'

export default function Home() {
	const canvasRef = useRef<CanvasRef>(null)
	const [selectedTool, setSelectedTool] = useState<ToolType>('select')

	const clearCanvas = () => {
		canvasRef.current?.clear()
	}

	const undo = () => {
		canvasRef.current?.undo()
	}

	const redo = () => {
		canvasRef.current?.redo()
	}

	return (
		<div className="flex min-h-screen">
			<Toolbar
				selectedTool={selectedTool}
				setSelectedTool={setSelectedTool}
				onClear={clearCanvas}
			/>
			<Canvas
				ref={canvasRef}
				selectedTool={selectedTool}
			/>
			<ActionBar
				onUndo={undo}
				onRedo={redo}
			/>
		</div>
	)
}
