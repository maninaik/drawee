import { useEffect, useState } from 'react'
import { ElementType } from '@/types'

export const useHistory = (initialState: ElementType[]) => {
	const [index, setIndex] = useState(0)
	const [history, setHistory] = useState([initialState])

	const setElements = (
		elements: ElementType[] | ((current: ElementType[]) => ElementType[]),
		overwrite = false
	) => {
		const action =
			typeof elements === 'function'
				? elements(history[index])
				: elements

		if (overwrite) {
			setHistory(prev => {
				const newHistory = [...prev]
				newHistory[index] = action
				return newHistory
			})
		} else {
			setHistory(prev => [...prev, action])
			setIndex(prev => prev + 1)
		}
	}
	const undo = () => index > 0 && setIndex(index - 1)
	const redo = () => index < history.length - 1 && setIndex(index + 1)

	useEffect(() => {
		console.log(history, 'history')
	}, [history])

	return {
		elements: history[index],
		setElements,
		undo,
		redo,
	}
}
