import { configure, addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { create as createTheme } from '@storybook/theming'

const theme = createTheme({
  base: 'dark'
})

addParameters({
  options: { theme }
})

addDecorator(withKnobs)

configure(require.context('../src/', true, /\.stories\.tsx$/), module)
