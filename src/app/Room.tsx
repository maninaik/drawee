'use client'

import { ReactNode } from 'react'
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from '@liveblocks/react/suspense'

export function Room({ children }: { children: ReactNode }) {
	return (
		<LiveblocksProvider
			publicApiKey={
				'pk_prod_1q3TwnvuG1LS1NuNRNru_27_AqXm8YMrQozFSOd2yJejpHZOS0goMiKCjbFNglFk'
			}>
			<RoomProvider
				id="my-room"
				initialPresence={{ cursor: null }}>
				<ClientSideSuspense fallback={<div>Loading…</div>}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	)
}
