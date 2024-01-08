import { CardType, ListType } from '../../types/kanbanTypes'
import { Card } from './Card'
import { List } from './List'
import * as S from './styles'

type KanbanProps = {
  lists: ListType[]
  cards: CardType[]
}

export function Kanban({ lists, cards }: KanbanProps) {
  return (
    <S.Kanban>
      {lists.map(({ title }) => (
        <List key={title}>
          {cards.map(({ title, description }) => (
            <Card key={title} title={title} description={description} />
          ))}
        </List>
      ))}
    </S.Kanban>
  )
}
