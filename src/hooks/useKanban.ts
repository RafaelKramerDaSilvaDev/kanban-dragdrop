import { CardType, ListType } from '../types/kanbanTypes'

type KanbanProps = {
  lists: ListType[]
  cards: CardType[]
}

export function useKanban({ lists, cards }: KanbanProps) {
  const kanbanProps = { lists, cards }

  return { kanbanProps }
}
