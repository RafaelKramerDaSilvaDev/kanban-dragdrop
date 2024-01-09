import { CardType, ListType } from '../components/Kanban/types'

type KanbanProps = {
  lists: ListType[]
  cards: CardType[]
}

export function useKanban({ lists, cards }: KanbanProps) {
  const kanbanProps = { lists, cards }

  return { kanbanProps }
}
