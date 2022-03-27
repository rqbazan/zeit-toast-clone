import * as React from 'react'

export interface EmojiProps {
  ariaLabel: string
  render: string
}

export default function Emoji({ ariaLabel, render }: EmojiProps) {
  return (
    <span role="img" aria-label={ariaLabel}>
      {render}
    </span>
  )
}
