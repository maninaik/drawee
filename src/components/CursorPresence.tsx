'use client'

import { useUpdateMyPresence, useOthers } from '@liveblocks/react'
import Cursor from './Cursor'

// Function to generate a color based on connectionId
const getColorFromConnectionId = (connectionId: number): string => {
	// List of pleasant colors for cursors
	const colors = [
		'#FFB5B5', // Pastel Pink
		'#B5FFB5', // Pastel Green
		'#B5B5FF', // Pastel Blue
		'#FFE5B5', // Pastel Orange
		'#E5B5FF', // Pastel Purple
		'#B5FFFF', // Pastel Cyan
	]
	return colors[connectionId % colors.length]
}

export default function CursorPresence({
	children,
}: {
	children: React.ReactNode
}) {
	const updateMyPresence = useUpdateMyPresence()
	const others = useOthers()

	return (
		<div
			className="absolute inset-0 z-10"
			onPointerMove={e => {
				updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
			}}
			onPointerLeave={() => {
				updateMyPresence({ cursor: null })
			}}>
			{others.map(({ connectionId, presence }) =>
				presence.cursor ? (
					<Cursor
						key={connectionId}
						x={presence.cursor.x}
						y={presence.cursor.y}
						color={getColorFromConnectionId(connectionId)}
						// name={`User ${connectionId}`}
					/>
				) : null
			)}
			{children}
		</div>
	)
}
