import { CircleIcon, RefreshCcw, SquareIcon, TypeOutline } from 'lucide-react'

import { ToolType, Tools } from '@/types'

interface ToolbarProps {
	selectedShape: ToolType
	setSelectedShape: (shape: ToolType) => void
	onClear: () => void
}

export default function Toolbar({
	selectedShape,
	setSelectedShape,
	onClear,
}: ToolbarProps) {
	return (
		<div className="p-2 absolute top-2 left-2/4 -translate-x-1/2 backdrop-blur-lg rounded-lg">
			<div className="flex space-x-2">
				<button
					className={`w-full p-2 rounded center-content ${
						selectedShape === Tools.circle
							? 'bg-gray-200 '
							: 'bg-white hover:bg-gray-200'
					}`}
					onClick={() => setSelectedShape(Tools.circle)}>
					<CircleIcon className="h-4 w-4" />
				</button>
				<button
					className={`w-full p-2 rounded center-content ${
						selectedShape === Tools.rectangle
							? 'bg-gray-200 '
							: 'bg-white hover:bg-gray-200'
					}`}
					onClick={() => setSelectedShape(Tools.rectangle)}>
					<SquareIcon className="h-4 w-4" />
				</button>
				<button
					className={`w-full p-2 rounded center-content   ${
						selectedShape === Tools.text
							? 'bg-gray-200 '
							: 'bg-white hover:bg-gray-200'
					}`}
					onClick={() => setSelectedShape(Tools.text)}>
					<TypeOutline className="h-4 w-4" />
				</button>

				<button
					className="w-full p-2 rounded center-content bg-white hover:bg-gray-200"
					onClick={onClear}>
					<RefreshCcw className="h-4 w-4" />
				</button>
			</div>
		</div>
	)
}
