import { Card } from './components/Card'
import { List } from './components/List'
import { KanbanProvider, useKanbanContext } from './context/KanbanContext'
import { CardType, ListType } from './types'
import * as S from './styles'
import { useEffect } from 'react'

type KanbanProps = {
  lists: ListType[]
  cards: CardType[]
}

export function Kanban({ lists, cards }: KanbanProps) {
  return (
    <KanbanProvider>
      <KanbanChild lists={lists} cards={cards} />
    </KanbanProvider>
  )
}

function KanbanChild({ lists, cards }: KanbanProps) {
  const { droppableRef, setLists } = useKanbanContext()

  useEffect(() => {
    setLists(lists)
  }, [lists, setLists])

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
