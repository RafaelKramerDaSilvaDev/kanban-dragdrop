import { MouseEvent, useEffect, useRef, useState } from 'react'

export function useInternalKanban() {
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const draggableRef = useRef<HTMLDivElement>(null)

  const handleDraggable = (e: MouseEvent) => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setOffset({ x, y })
      setIsDragging(true)
    }
  }

  const handleDroppable = () => {
    setOffset({ x: 0, y: 0 })
    setIsDragging(false)
  }

  useEffect(() => {
    const handleStartDragging = (e: globalThis.MouseEvent) => {
      if (isDragging && draggableRef.current) {
        const x = e.clientX - offset.x
        const y = e.clientY - offset.y

        setCoordinates({ x, y })
      }
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleStartDragging)
      window.addEventListener('mousedown', handleStartDragging)
    }

    return () => {
      window.removeEventListener('mousemove', handleStartDragging)
      window.removeEventListener('mousedown', handleStartDragging)
    }
  }, [isDragging, offset])

  return {
    draggableRef,
    handleDraggable,
    handleDroppable,
    isDragging,
    coordinates,
  }
}