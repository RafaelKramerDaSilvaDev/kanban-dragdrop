import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useKanbanContext } from '../../context/KanbanContext'
import { CardType } from '../../types'
import * as S from './styles'

const RESET_COORDINATES = { x: 0, y: 0 }

export function Card({ title, description }: CardType) {
  const { checkDropZone } = useKanbanContext()

  const [isDragging, setIsDragging] = useState(false)
  const [coordinates, setCoordinates] = useState(RESET_COORDINATES)
  const [offset, setOffset] = useState(RESET_COORDINATES)

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
    const lastCoordinate = coordinates

    checkDropZone(lastCoordinate)
    setIsDragging(false)
    setOffset(RESET_COORDINATES)
  }

  useEffect(() => {
    const handleStartDragging = (e: globalThis.MouseEvent) => {
      if (isDragging && draggableRef.current) {
        const x = e.clientX - offset.x
        const y = e.clientY - offset.y

        setCoordinates({ x, y })
        console.log('Coordenadas atuais: ' + x, y)
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
  }, [draggableRef, isDragging, offset.x, offset.y])

  return (
    <S.Card
      ref={draggableRef}
      onMouseDown={handleDraggable}
      onMouseUp={handleDroppable}
      $isDragging={isDragging}
      $coordinates={coordinates}
    >
      <span>{title}</span>
      <p>{description}</p>
    </S.Card>
  )
}
