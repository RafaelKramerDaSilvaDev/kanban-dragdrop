import { Kanban } from './components/Kanban'
import * as S from './AppStyles'
import { useKanban } from './hooks/useKanban'
import { listOfCards } from './repositories/listOfCards'

export function App() {
  const { kanbanProps } = useKanban({
    lists: [{ title: 'A fazer' }, { title: 'Fazendo' }, { title: 'Feito' }],
    cards: listOfCards,
  })

  return (
    <S.Container>
      <Kanban {...kanbanProps} />
    </S.Container>
  )
}
