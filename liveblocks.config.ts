// Define Liveblocks types for your application

import { LiveObject } from '@liveblocks/client'
import { ElementType } from '@/types'
import { LiveList } from '@liveblocks/client'

// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
	interface Liveblocks {
		// Each user's Presence, for useMyPresence, useOthers, etc.
		Presence: {
			// Example, real-time cursor coordinates
			cursor: { x: number; y: number } | null
		}

		// The Storage tree for the room, for useMutation, useStorage, etc.
		Storage: {
			// Example, a conflict-free list
			// animals: LiveList<string>;
			history: LiveList<ElementType[]>
			currentIndex: LiveObject<{ value: number }>
		}

		// Custom user info set when authenticating with a secret key
		UserMeta: {
			id: string
			info: {}
		}

		// Custom events, for useBroadcastEvent, useEventListener
		RoomEvent: {}
		// Example has two events, using a union
		// | { type: "PLAY" }
		// | { type: "REACTION"; emoji: "🔥" };

		// Custom metadata set on threads, for useThreads, useCreateThread, etc.
		ThreadMetadata: {}

		// Custom room info set with resolveRoomsInfo, for useRoomInfo
		RoomInfo: {}
	}
}

export {}
