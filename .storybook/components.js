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
  flex-direction: column;

  > button {
    flex-grow: 1;
  }

  > button:not(:last-child) {
    margin-bottom: 16px;
  }

  @media (min-width: 46em) {
    flex-direction: row;

    > button:not(:last-child) {
      margin-right: 16px;
    }
  }
`

export const Container = styled.div`
  padding: 24px;
`
