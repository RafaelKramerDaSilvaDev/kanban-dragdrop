import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ListType } from '../types'

const RESET_DROPPABLE_ZONES = [{ top: 0, left: 0, right: 0, bottom: 0 }]

const RESET_COORDINATES = { x: 0, y: 0 }

type InternalKanbanProps = { lists?: ListType[] }

export function useInternalKanban({ lists }: InternalKanbanProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState(RESET_COORDINATES)
  const [coordinates, setCoordinates] = useState(RESET_COORDINATES)
  const [droppableZones, setDroppableZones] = useState(RESET_DROPPABLE_ZONES)
  const [lastDroppedPosition, setLastDroppedPosition] =
    useState(RESET_COORDINATES)
  const [isDropZone, setIsDropZone] = useState(false)

  const draggableRef = useRef<HTMLDivElement>(null)
  const droppableRef = useRef<HTMLDivElement>(null)

  // Draggable

  const handleDraggable = (e: MouseEvent) => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setOffset({ x, y })
      setLastDroppedPosition(RESET_COORDINATES)
      setIsDragging(true)
    }
  }

  const handleDroppable = () => {
    checkDropZone()
    setLastDroppedPosition(coordinates)
    setIsDragging(false)
    setOffset(RESET_COORDINATES)
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

  // Droppable

  const calculateDropZones = useCallback(() => {
    if (!droppableRef.current || !lists) return

    const kanbanWidth = droppableRef.current.clientWidth
    const kanbanHeight = droppableRef.current.clientHeight
    const amountOfLists = lists.length
    const droppableWidth = kanbanWidth / amountOfLists

    const droppableZones = lists.map((_, listIndex) => ({
      top: 0,
      right: Math.floor((listIndex + 1) * droppableWidth),
      bottom: kanbanHeight,
      left:
        listIndex === 0
          ? Math.floor(listIndex * droppableWidth)
          : Math.floor(listIndex * droppableWidth) + 1,
    }))

    setDroppableZones(droppableZones)
  }, [lists])

  const checkDropZone = useCallback(() => {
    const lastDroppableZone = droppableZones?.length - 1

    console.log(lastDroppedPosition)
    console.log(droppableZones[0])
    if (
      lastDroppedPosition.x < droppableZones[0].left &&
      lastDroppedPosition.x > droppableZones[lastDroppableZone].right &&
      lastDroppedPosition.y < droppableZones[0].top &&
      lastDroppedPosition.y > droppableZones[0].bottom
    ) {
      setIsDropZone(true)
      console.log('true')
    }

    setIsDropZone(false)
    console.log('false')
  }, [droppableZones, lastDroppedPosition])

  useEffect(() => {
    calculateDropZones()
  }, [calculateDropZones])

  console.log(lastDroppedPosition)
  console.log(isDropZone)

  return {
    draggableRef,
    handleDraggable,
    handleDroppable,
    isDragging,
    coordinates,

    droppableRef,
  }
}
