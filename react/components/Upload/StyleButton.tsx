import React from 'react'
import { Tooltip } from 'vtex.styleguide'

interface Props {
  label: string | JSX.Element
  title?: string | JSX.Element
  active: boolean
  onToggle: (style: string | null) => void
  style: string | null
  className?: string
}

function StyleButton({
  active,
  onToggle,
  label,
  style,
  className = '',
  title = '',
}: Props) {
  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    onToggle(style)
  }

  return (
    <Tooltip label={title} position="bottom">
      <div
        className={`vtex-styleguide-9-x-container vtex-dropdown__container br2 relative bw1 bg-base ba h-regular c-action-primary hover-b--muted-3 b--muted-4 t-body ${
          active ? 'bg-muted-5' : ''
        } ${className}`}
        onMouseDown={handleToggle}
        role="button"
        tabIndex={0}
      >
        {label}
      </div>
    </Tooltip>
  )
}

export default StyleButton
