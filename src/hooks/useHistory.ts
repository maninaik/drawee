import { useStorage, useMutation } from '@liveblocks/react'
import { ElementType } from '@/types'

export const useHistory = (initialState: ElementType[]) => {
	const history = useStorage(root => root.history)
	const currentIndex = useStorage(root => root.currentIndex)

	const setElements = useMutation(
		(
			{ storage },
			elements:
				| ElementType[]
				| ((current: ElementType[]) => ElementType[]),
			overwrite = false
		) => {
			const mutableHistory = storage.get('history')
			const mutableCurrentIndex = storage.get('currentIndex')
			const index = mutableCurrentIndex.get('value')

			const action =
				typeof elements === 'function'
					? elements(mutableHistory.get(index) ?? [])
					: elements

			if (overwrite) {
				mutableHistory.set(index, action)
			} else {
				// Remove any future history
				const historyCopy = mutableHistory
					.toArray()
					.slice(0, index + 1)
				mutableHistory.clear()
				historyCopy.forEach(item => mutableHistory.push(item))

				// Add new state
				mutableHistory.push(action)
				mutableCurrentIndex.set('value', mutableHistory.length - 1)
			}
		},
		[]
	)

	const undo = useMutation(({ storage }) => {
		const mutableCurrentIndex = storage.get('currentIndex')
		const index = mutableCurrentIndex.get('value')
		if (index > 0) {
			mutableCurrentIndex.set('value', index - 1)
		}
	}, [])

	const redo = useMutation(({ storage }) => {
		const mutableHistory = storage.get('history')
		const mutableCurrentIndex = storage.get('currentIndex')
		const index = mutableCurrentIndex.get('value')
		if (index < mutableHistory.length - 1) {
			mutableCurrentIndex.set('value', index + 1)
		}
	}, [])

	return {
		elements: history?.[currentIndex?.value ?? 0] ?? initialState,
		setElements,
		undo,
		redo,
	}
}
