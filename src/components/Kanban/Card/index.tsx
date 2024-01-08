import { CardType } from '../../../types/kanbanTypes'
import * as S from './styles'

export function Card({ title, description }: CardType) {
  return (
    <S.Card>
      <span>{title}</span>
      <p>{description}</p>
    </S.Card>
  )
}
