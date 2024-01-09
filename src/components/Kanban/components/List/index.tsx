import { PropsWithChildren } from 'react'
import { ListType } from '../../types'
import * as S from './styles'

type ListProps = PropsWithChildren & ListType

export function List({ children, title }: ListProps) {
  return (
    <S.List>
      <h3>{title}</h3>
      {children}
    </S.List>
  )
}
