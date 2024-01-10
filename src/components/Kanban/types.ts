export type ListType = {
  title: string
}

export type CardType = {
  list?: number
  title: string
  description: string
}

export type DragStatus = 'startDrag' | 'endDrag'
