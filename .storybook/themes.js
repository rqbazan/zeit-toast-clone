import { create as createTheme } from '@storybook/theming'

const common = {
  brandTitle: 'ZEIT Toast Clone',
  barBg: '#bfbfbf',
  appBorderColor: '#919191',
  barTextColor: 'black',
  colorPrimary: '#b0b0b0',
  colorSecondary: '#6200ff'
}

export const light = createTheme({
  ...common,
  base: 'light',
  inputBg: '#e3e3e3'
})

export const dark = createTheme({
  ...common,
  base: 'dark'
})
