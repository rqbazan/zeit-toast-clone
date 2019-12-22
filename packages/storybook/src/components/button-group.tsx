import styled from 'styled-components'

export default styled.div`
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
