type CursorProps = {
	x: number
	y: number
	color: string
	name?: string
}

export default function Cursor({ x, y, color, name }: CursorProps) {
	return (
		<div
			className="pointer-events-none absolute left-0 top-0"
			style={{
				transform: `translateX(${x}px) translateY(${y}px)`,
			}}>
			{/* Cursor */}
			<svg
				width="24"
				height="36"
				viewBox="0 0 24 36"
				fill="none"
				stroke="white"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					stroke: color,
					fill: color,
				}}>
				<path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" />
			</svg>

			{/* Name label */}
			<div
				className="absolute left-2 top-5 rounded-md px-1.5 py-0.5 text-xs text-white"
				style={{
					backgroundColor: color,
				}}>
				{name ?? 'User'}
			</div>
		</div>
	)
}
