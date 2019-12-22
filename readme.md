# ZEIT TOAST CLONE

A front-end challenge required by myself 😅, I worked with animation effects
powered by the awesome `react-spring` library. 😍

## Basic Usage

---

Install the library and its peer dependencies

```bash
yarn add zeit-toast-clone
npx install-peerdeps zeit-toast-clone
```

Import and render the `NotifierPortal` component in the root of your
application, as well as the styles.

```jsx
import { NotifierPortal } from 'zeit-toast-clone'
import 'zeit-toast-clone/styles.css'

const App = () => {
  return <NotifierPortal />
}
```

Import and use the `notifier` wherever you want.

```jsx
import notifier from 'zeit-toast-clone'

const Component = () => {
  return (
    <button onClick={() => notifier.info('Say hello to my little friend')}>
      Show message
    </button>
  )
}
```

## API

---

### `<NotifierPortal />`

| PropName    | Type             | Default        | Description                                         |
| ----------- | ---------------- | -------------- | --------------------------------------------------- |
| `component` | `ReactComponent` | `Notification` | The notification component to show the messages     |
| `height`    | `number`         | `64`           | Height of the notification _(needed for animation)_ |
| `offset`    | `number`         | `16`           | Offset of the notification _(needed for animation)_ |

### `notifier`

| Attribute | Type                    | Description                 |
| --------- | ----------------------- | --------------------------- |
| `info`    | `(msg: string) => void` | Show an info notification   |
| `error`   | `(msg: string) => void` | Show an error notification  |
| `success` | `(msg: string) => void` | Show a success notification |
| `warning` | `(msg: string) => void` | Show a warning notification |

### `<Notification />`

> This component wasn't created to be customizable, I exposed it just for demo
> purposes on the storybook package.

| PropName  | Type                                          | Description                  |
| --------- | --------------------------------------------- | ---------------------------- |
| `kind`    | `'error' \| 'warning' \| 'success' \| 'info'` | Flavor of the notification   |
| `message` | `string`                                      | Content displayed as message |

## Customize

---

The first level of customization is possible through the props of
`<NotifierPortal />`, but also
[there is a few CSS classes and variables.](https://github.com/rqbazan/zeit-toast-clone/blob/master/packages/library/styles.css)
