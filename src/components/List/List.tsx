import { For, splitProps, type Accessor } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

type ListProps<T> = JSX.HTMLAttributes<HTMLUListElement> & {
  items: T[]
  render: (item: T, index: Accessor<number>) => JSX.Element
}

export function List<T>(props: ListProps<T>) {
  const [local, rest] = splitProps(props, ['render', 'items'])

  return (
    <ul {...rest}>
      <For each={local.items}>{(item, index) => <li>{local.render(item, index)}</li>}</For>
    </ul>
  )
}
