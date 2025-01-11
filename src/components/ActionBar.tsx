import React from 'react'
import { Undo2, Redo2 } from 'lucide-react'
import { useOthers } from '@liveblocks/react/suspense'

interface ActionBarProps {
	onUndo: () => void
	onRedo: () => void
}

const ActionBar = ({ onUndo, onRedo }: ActionBarProps) => {
	const others = useOthers()
	return (
		<div className="p-4 absolute bottom-0 left-4 flex gap-3">
			<button
				className="bg-gray-200 p-2 rounded-md"
				title="Undo"
				onClick={onUndo}>
				<Undo2 className="w-4 h-4" />
			</button>
			<button
				className="bg-gray-200 p-2 rounded-md"
				title="Redo"
				onClick={onRedo}>
				<Redo2 className="w-4 h-4" />
			</button>
			<div className="bg-gray-200">{others.length}</div>
		</div>
	)
}

export default ActionBar
