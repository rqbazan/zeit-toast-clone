import React from 'react'
import addons from '@storybook/addons'
import { DarkModeContext as ZEITToastCloneDarkModeContext } from 'zeit-toast-clone'
import 'zeit-toast-clone/styles.css'

const DARK_MODE_ADDON_STORAGE_KEY = 'sb-addon-themes-3'
const DARK_MODE_ADDON_CHANNEL = 'DARK_MODE'

const channel = addons.getChannel()

const initIsDark = () => {
  const stored = localStorage[DARK_MODE_ADDON_STORAGE_KEY]

  if (!stored) {
    return false
  }

  return JSON.parse(stored).current === 'dark'
}

const App = ({ children }) => {
  const [isDark, setDark] = React.useState(initIsDark)

  React.useEffect(() => {
    channel.on(DARK_MODE_ADDON_CHANNEL, setDark)

    return () => {
      channel.removeListener(DARK_MODE_ADDON_CHANNEL, setDark)
    }
  }, [])

  return (
    <ZEITToastCloneDarkModeContext.Provider value={isDark}>
      <div style={{ padding: 24 }}>{children}</div>
    </ZEITToastCloneDarkModeContext.Provider>
  )
}

export default App
