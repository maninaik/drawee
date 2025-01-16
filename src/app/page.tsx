'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	const createRoom = () => {
		const roomId = Math.random().toString(36).slice(2, 9)
		router.push(`/room/${roomId}`)
	}

	return (
		<main className="flex min-h-screen w-full">
			<div className="flex flex-col items-center justify-center w-full">
				<h1 className="text-4xl font-bold">Drawee</h1>
				<p className="text-lg text-gray-500">
					A collaborative whiteboard app
				</p>
				<div className="flex gap-2 mt-4">
					<button
						onClick={createRoom}
						className="px-4 py-2 rounded-md border border-gray-300">
						Create Room
					</button>
					<button className="px-4 py-2 rounded-md border border-gray-300">
						Join Room
					</button>
				</div>
			</div>
		</main>
	)
}
