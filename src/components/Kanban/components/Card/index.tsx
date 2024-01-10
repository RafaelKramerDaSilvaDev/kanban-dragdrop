import { useInternalKanban } from '../../hooks/useInternalKanban'
import { CardType } from '../../types'
import * as S from './styles'

export function Card({ title, description }: CardType) {
  const {
    draggableRef,
    handleDraggable,
    handleDroppable,
    isDragging,
    coordinates,
  } = useInternalKanban({})

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
