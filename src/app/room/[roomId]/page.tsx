'use client'

import { use, useRef, useState } from 'react'
import Toolbar from '@/components/Toolbar'
import Canvas, { CanvasRef } from '@/components/Canvas'
import { ToolType } from '@/types'
import ActionBar from '@/components/ActionBar'
import { Room } from './Room'
import CursorPresence from '@/components/CursorPresence'

export default function RoomPage({
	params,
}: {
	params: Promise<{ roomId: string }>
}) {
	const canvasRef = useRef<CanvasRef>(null)
	const roomId = use(params).roomId
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

	console.log(roomId, 'roomId')
	return (
		<div className="flex min-h-screen">
			<Room roomId={roomId}>
				<CursorPresence>
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
				</CursorPresence>
			</Room>
		</div>
	)
}
