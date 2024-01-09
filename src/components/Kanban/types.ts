export type ListType = {
  title: string
}

export type CardType = {
  list?: number
  title: string
  description: string
}

export type Axes = {
  x: number
  y: number
} | null

export type DragStatus = 'startDrag' | 'endDrag'

export type DragSteps = {
  status?: DragStatus
  currentPosition?: Axes
}
