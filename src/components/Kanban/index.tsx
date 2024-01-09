import { CardType, ListType } from './types'
import { List } from './components/List'
import * as S from './styles'
import { Card } from './components/Card'

type KanbanProps = {
  lists: ListType[]
  cards: CardType[]
}

export function Kanban({ lists, cards }: KanbanProps) {
  return (
    <S.Kanban>
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
