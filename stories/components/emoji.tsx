import * as React from 'react'

export default function Emoji({ ariaLabel, render }) {
  return (
    <span role="img" aria-label={ariaLabel}>
      {render}
    </span>
  )
}
