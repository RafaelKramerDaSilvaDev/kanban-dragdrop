import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ListType } from '../types'

type KanbanContextProps = {
  droppableRef: RefObject<HTMLDivElement>

  setLists: Dispatch<SetStateAction<ListType[]>>
  checkDropZone: (lastCoordinate: { x: number; y: number }) => void
}

const KanbanContext = createContext({} as KanbanContextProps)

const RESET_DROPPABLE_ZONES = [{ top: 0, left: 0, right: 0, bottom: 0 }]

export function KanbanProvider({ children }: PropsWithChildren) {
  const [droppableZones, setDroppableZones] = useState(RESET_DROPPABLE_ZONES)
  const [isDropZone, setIsDropZone] = useState(false)
  const [lists, setLists] = useState<ListType[]>([])

  const droppableRef = useRef<HTMLDivElement>(null)

  const calculateDropZones = useCallback(() => {
    if (!droppableRef.current || !lists) return

    const kanbanRect = droppableRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY
    const scrollLeft = window.scrollX

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

    console.log('Zonas Dropáveis:')
    console.log(droppableZones)
  }, [lists])

  const checkDropZone = (lastCoordinate: { x: number; y: number }) => {
    console.log(
      'Última Coordenada: ' + lastCoordinate.x + ' ' + lastCoordinate.y,
    )

    const isValidDropZone = droppableZones.some((zone) => {
      return (
        lastCoordinate.x >= zone.left &&
        lastCoordinate.x <= zone.right &&
        lastCoordinate.y >= zone.top &&
        lastCoordinate.y <= zone.bottom
      )
    })

    setIsDropZone(isValidDropZone)
    console.log('É dropável? ' + isValidDropZone)
  }

  useEffect(() => {
    const droppableContainer = droppableRef.current

    if (droppableContainer) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === droppableContainer) {
            calculateDropZones()
          }
        }
      })

      resizeObserver.observe(droppableContainer)

      return () => resizeObserver.unobserve(droppableContainer)
    }
  }, [calculateDropZones])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          calculateDropZones()
        }
      })
    })

    const config = { childList: true, subtree: true }
    observer.observe(document.body, config)

    return () => observer.disconnect()
  }, [calculateDropZones])

  useEffect(() => {
    const handleResize = () => {
      calculateDropZones()
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [calculateDropZones])

  return (
    <KanbanContext.Provider
      value={{
        droppableRef,

        setLists,
        checkDropZone,
      }}
    >
      {children}
    </KanbanContext.Provider>
  )
}

export function useKanbanContext() {
  const context = useContext(KanbanContext)

  if (context === undefined) {
    throw new Error('useKanbanContext must be used within a KanbanProvider')
  }

  return context
}
