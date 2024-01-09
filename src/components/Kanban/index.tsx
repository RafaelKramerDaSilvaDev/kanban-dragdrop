import { Card } from './components/Card'
import { List } from './components/List'
import { useInternalKanban } from './hooks/useInternalKanban'
import * as S from './styles'
import { CardType, ListType } from './types'

type KanbanProps = {
  lists: ListType[]
  cards: CardType[]
}

export function Kanban({ lists, cards }: KanbanProps) {
  const { droppableRef } = useInternalKanban({ lists })

  return (
    <S.Kanban ref={droppableRef}>
      {lists.map(({ title }, listIndex) => (
        <List key={title} title={title}>
          {cards
            .filter(({ list }) => list === listIndex)
            .map(({ title, description }) => (
              <Card key={title} title={title} description={description} />
            ))}
        </List>
      ))}
    </S.Kanban>
  )
}
