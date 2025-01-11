import { MousePointer2 } from 'lucide-react'

function Cursor({ x, y }: { x: number; y: number }) {
	return (
		<MousePointer2
			style={{
				position: 'absolute',
				transform: `translate(${x}px, ${y}px)`,
			}}
		/>
	)
}

export default Cursor
