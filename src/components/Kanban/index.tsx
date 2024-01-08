import { Card } from './Card'
import { List } from './List'
import * as S from './styles'

export function Kanban() {
  return (
    <S.Kanban>
      <List>
        <Card />
        <Card />
        <Card />
        <Card />
      </List>
      <List>
        <Card />
        <Card />
        <Card />
        <Card />
      </List>
      <List>
        <Card />
        <Card />
        <Card />
        <Card />
      </List>
    </S.Kanban>
  )
}
