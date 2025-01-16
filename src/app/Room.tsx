'use client'

import { ReactNode } from 'react'
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from '@liveblocks/react/suspense'
import { LiveList } from '@liveblocks/client'
import { LiveObject } from '@liveblocks/client'

export function Room({ children }: { children: ReactNode }) {
	return (
		<LiveblocksProvider
			publicApiKey={
				'pk_prod_1q3TwnvuG1LS1NuNRNru_27_AqXm8YMrQozFSOd2yJejpHZOS0goMiKCjbFNglFk'
			}>
			<RoomProvider
				id="my-room"
				initialPresence={{ cursor: null }}
				initialStorage={{
					history: new LiveList([]),
					currentIndex: new LiveObject({ value: 0 }),
				}}>
				<ClientSideSuspense fallback={<div>Loading…</div>}>
					{() => children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	)
}
