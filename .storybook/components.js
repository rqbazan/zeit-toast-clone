import React from 'react'
import styled from 'styled-components'

export const Button = styled.button.attrs({ type: 'button' })`
  appearance: none;
  background-color: #6200ff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  height: 48px;
  outline: none;
  padding: 0 24px;
  user-select: none;
`

export const Emoji = ({ ariaLabel, render }) => (
  <span role="img" aria-label={ariaLabel}>
    {render}
  </span>
)

export const ButtonGroup = styled.div`
  display: flex;

  > button {
    flex-grow: 1;

    :not(:last-child) {
      margin-right: 16px;
    }
  }
`
