import {
	CircleIcon,
	MousePointer2,
	RefreshCcw,
	SquareIcon,
	TypeOutline,
} from 'lucide-react'

import { ToolType, Tools } from '@/types'

interface ToolbarProps {
	selectedTool: ToolType
	setSelectedTool: (tool: ToolType) => void
	onClear: () => void
}

export default function Toolbar({
	selectedTool,
	setSelectedTool,
	onClear,
}: ToolbarProps) {
	return (
		<div className="p-2 absolute top-2 left-2/4 -translate-x-1/2 backdrop-blur-lg rounded-lg">
			<div className="flex space-x-2">
				<button
					className={`w-full p-2 rounded center-content ${
						selectedTool === Tools.select
							? 'bg-gray-200 '
							: 'bg-white hover:bg-gray-200'
					}`}
					onClick={() =>
						setSelectedTool(Tools.select as ToolType)
					}>
					<MousePointer2 className="h-4 w-4" />
				</button>
				{/* <button
					className={`w-full p-2 rounded center-content ${
						selectedTool === Tools.circle
							? 'bg-gray-200 '
							: 'bg-white hover:bg-gray-200'
					}`}
					onClick={() =>
						setSelectedTool(Tools.circle as ToolType)
					}>
					<CircleIcon className="h-4 w-4" />
				</button> */}
				<button
					className={`w-full p-2 rounded center-content ${
						selectedTool === Tools.rectangle
							? 'bg-gray-200 '
							: 'bg-white hover:bg-gray-200'
					}`}
					onClick={() =>
						setSelectedTool(Tools.rectangle as ToolType)
					}>
					<SquareIcon className="h-4 w-4" />
				</button>
				<button
					className={`w-full p-2 rounded center-content   ${
						selectedTool === Tools.text
							? 'bg-gray-200 '
							: 'bg-white hover:bg-gray-200'
					}`}
					onClick={() =>
						setSelectedTool(Tools.text as ToolType)
					}>
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
