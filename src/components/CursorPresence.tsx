'use client'

import { useUpdateMyPresence, useOthers } from '@liveblocks/react'
import Cursor from './Cursor'

export default function CursorPresence() {
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
					/>
				) : null
			)}
		</div>
	)
}
