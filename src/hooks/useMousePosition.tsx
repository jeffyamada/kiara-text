import { useThree } from '@react-three/fiber'
import { useCallback, useEffect, useRef } from 'react'

export type onMoveType = (pointer: {
  x: number
  y: number
  client: {
    x: number
    y: number
  }
}) => void | null | undefined

const useMousePosition = (onMove?: onMoveType) => {
  const pointerRef = useRef({
    x: 0,
    y: 0,
    client: {
      x: 0,
      y: 0,
    },
  })
  const { size } = useThree()
  const { width: vw, height: vh } = size

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      pointerRef.current.x = e.clientX / vw - 0.5
      pointerRef.current.y = e.clientY / vh - 0.5

      pointerRef.current.client.x = e.clientX
      pointerRef.current.client.y = e.clientY

      if (onMove) onMove(pointerRef.current)
    },
    [vh, vw, onMove],
  )

  useEffect(() => {
    if (global?.window) {
      window.addEventListener('pointermove', handlePointerMove)
    }

    const moveHandler = handlePointerMove

    return () => {
      if (!global?.window) return
      window.removeEventListener('pointermove', moveHandler)
    }
  }, [handlePointerMove, onMove, vh, vw])

  return { pointer: pointerRef.current }
}

export default useMousePosition
