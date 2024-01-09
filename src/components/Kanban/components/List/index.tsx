import { PropsWithChildren } from 'react'
import * as S from './styles'
import { ListType } from '../../types'

type ListProps = PropsWithChildren & ListType

export function List({ children, title }: ListProps) {
  return (
    <S.List>
      <h3>{title}</h3>
      {children}
    </S.List>
  )
}
