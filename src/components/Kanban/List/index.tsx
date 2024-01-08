import { PropsWithChildren } from 'react'
import * as S from './styles'

export function List({ children }: PropsWithChildren) {
  return <S.List>{children}</S.List>
}
