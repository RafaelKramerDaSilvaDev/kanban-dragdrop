/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Card } from './components/Card'
import { List } from './components/List'
import { KanbanProvider, useKanbanContext } from './context/KanbanContext'
import * as S from './styles'
import { CardType, ListType } from './types'

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

function KanbanChild({ lists, cards: initialCards }: KanbanProps) {
  const { droppableRef, setInitialValues, cards } = useKanbanContext()

  useEffect(() => {
    setInitialValues(lists, initialCards)
  }, [initialCards, lists])

  return (
    <S.Kanban ref={droppableRef}>
      {lists.map(({ title }, listIndex) => (
        <List key={title} title={title}>
          {cards
            .filter(({ list }) => list === listIndex)
            .map(({ id, title, description }) => (
              <Card
                key={id + title}
                id={id}
                title={title}
                description={description}
              />
            ))}
        </List>
      ))}
    </S.Kanban>
  )
}
