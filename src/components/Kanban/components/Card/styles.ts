import styled from 'styled-components'

type CardStyleProps = {
  $isDragging?: boolean
  $coordinates?: { x: number; y: number }
}

export const Card = styled.div<CardStyleProps>`
  position: ${({ $isDragging }) => {
    if ($isDragging) return 'absolute'

    return 'relative'
  }};

  left: ${({ $coordinates }) => {
    if (!$coordinates?.x) return 'auto'

    return `${$coordinates?.x}px`
  }};

  top: ${({ $coordinates }) => {
    if (!$coordinates?.y) return 'auto'

    return `${$coordinates?.y}px`
  }};

  z-index: ${({ $isDragging }) => {
    if ($isDragging) return '1000'

    return 'auto'
  }};

  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: #fbf9f1;
  padding: 16px;

  width: 400px;

  cursor: grab;

  span {
    font-weight: 600;
  }

  &:active {
    cursor: grabbing;
  }
`
