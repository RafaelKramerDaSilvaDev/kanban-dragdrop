import * as S from './AppStyles'
import { listOfCards } from './repositories/listOfCards'
import { useKanban } from './hooks/useKanban'
import { Kanban } from './components/Kanban'

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
