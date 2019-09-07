import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { create as createTheme } from '@storybook/theming'
import { Container } from './components'

addParameters({
  options: {
    theme: createTheme({
      base: 'light',
      brandTitle: 'ZEIT Toast Clone',
      barBg: '#bfbfbf',
      appBorderColor: '#919191',
      barTextColor: 'black',
      colorPrimary: '#b0b0b0',
      colorSecondary: '#6200ff',
      inputBg: '#e3e3e3'
    })
  }
})

addDecorator(withKnobs)

addDecorator(story => <Container>{story()}</Container>)

configure(require.context('../src/', true, /\.stories\.js$/), module)
