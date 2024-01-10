import {
  PropsWithChildren,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CardType, ListType } from '../types'

type KanbanContextProps = {
  droppableRef: RefObject<HTMLDivElement>
  cards: CardType[]
  setInitialValues: (lists: ListType[], cards: CardType[]) => void
  checkDropZone: (lastCoordinate: { x: number; y: number }) => number
  updateCardList: (cardId: number, newListIndex: number) => void
}

const RESET_DROPPABLE_ZONES = [{ top: 0, left: 0, right: 0, bottom: 0 }]

const kanbanContext = createContext({} as KanbanContextProps)

export function KanbanProvider({ children }: PropsWithChildren) {
  const [droppableZones, setDroppableZones] = useState(RESET_DROPPABLE_ZONES)
  const [lists, setLists] = useState<ListType[]>([])
  const [cards, setCards] = useState<CardType[]>([])

  const droppableRef = useRef<HTMLDivElement>(null)

  const setInitialValues = (lists: ListType[], cards: CardType[]) => {
    setLists(lists)
    setCards(cards)
  }

  const calculateDropZones = useCallback(() => {
    if (!droppableRef.current || !lists) return

    const scrollTop = window.scrollY
    const scrollLeft = window.scrollX

    const kanbanRect = droppableRef.current.getBoundingClientRect()
    const kanbanTop = kanbanRect.top + scrollTop
    const kanbanBottom = kanbanRect.bottom + scrollTop
    const kanbanLeft = kanbanRect.left + scrollLeft
    const kanbanWidth = kanbanRect.width

    const amountOfLists = lists.length
    const droppableWidth = kanbanWidth / amountOfLists

    const droppableZones = lists.map((_, listIndex) => ({
      top: kanbanTop,
      right: kanbanLeft + Math.floor((listIndex + 1) * droppableWidth),
      bottom: kanbanBottom,
      left: kanbanLeft + Math.floor(listIndex * droppableWidth),
    }))
    setDroppableZones(droppableZones)
  }, [lists])

  const checkDropZone = (lastCoordinate: { x: number; y: number }) => {
    const listIndex = droppableZones.findIndex(
      (zone) =>
        lastCoordinate.x >= zone.left &&
        lastCoordinate.x <= zone.right &&
        lastCoordinate.y >= zone.top &&
        lastCoordinate.y <= zone.bottom,
    )
    return listIndex
  }

  const updateCardList = (cardId: number, newListIndex: number) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, list: newListIndex }
        }
        return card
      }),
    )
  }

  // useEffect(() => {
  //   const droppableContainer = droppableRef.current

  //   if (droppableContainer) {
  //     const resizeObserver = new ResizeObserver((entries) => {
  //       for (const entry of entries) {
  //         if (entry.target === droppableContainer) {
  //           calculateDropZones()
  //         }
  //       }
  //     })

  //     resizeObserver.observe(droppableContainer)

  //     return () => resizeObserver.unobserve(droppableContainer)
  //   }
  // }, [calculateDropZones])

  // useEffect(() => {
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       if (mutation.type === 'childList') {
  //         calculateDropZones()
  //       }
  //     })
  //   })

  //   const config = { childList: true, subtree: true }
  //   observer.observe(document.body, config)

  //   return () => observer.disconnect()
  // }, [calculateDropZones])

  useEffect(() => {
    calculateDropZones()
  }, [calculateDropZones])

  useEffect(() => {
    const handleResize = () => {
      calculateDropZones()
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [calculateDropZones])

  return (
    <kanbanContext.Provider
      value={{
        droppableRef,
        cards,
        setInitialValues,
        checkDropZone,
        updateCardList,
      }}
    >
      {children}
    </kanbanContext.Provider>
  )
}

export function useKanbanContext() {
  const context = useContext(kanbanContext)

  if (context === undefined) {
    throw new Error('useKanbanContext must be used within a KanbanProvider')
  }

  return context
}
