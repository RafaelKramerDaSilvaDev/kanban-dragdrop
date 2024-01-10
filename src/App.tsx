import * as S from './AppStyles'
import { Kanban } from './components/Kanban'
import { listOfCards } from './repositories/listOfCards'

export function App() {
  return (
    <S.Container>
      <Kanban
        lists={[{ title: 'A fazer' }, { title: 'Fazendo' }, { title: 'Feito' }]}
        cards={listOfCards}
      />
    </S.Container>
  )
}
