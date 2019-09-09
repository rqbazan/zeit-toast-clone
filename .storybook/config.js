import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import * as themes from './themes'
import App from './app'

addParameters({ darkMode: themes })

addDecorator(withKnobs)

addDecorator(story => <App>{story({ a: 1 })}</App>)

configure(require.context('../src/', true, /\.stories\.js$/), module)
