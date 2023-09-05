import { For, createUniqueId, splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { twMerge } from 'tailwind-merge'

type SelectProps = Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  name: string
  label: string
} & (
    | { children: JSX.Element }
    | {
        items: { text: string; value: string | number }[]
        value?: string
      }
  )

export function Select(props: SelectProps) {
  const id = createUniqueId()

  if ('children' in props) {
    const [local, rest] = splitProps(props, ['class', 'label', 'children'])
    return (
      <div class="grid gap-2">
        <label class="font-bold" for={id}>
          {local.label}
        </label>
        <select class={twMerge('rounded px-2 py-1 shadow', local.class)} id={id} {...rest}>
          {local.children}
        </select>
      </div>
    )
  }

  const [local, rest] = splitProps(props, ['class', 'label', 'items', 'value'])
  return (
    <div class="grid gap-2">
      <label class="font-bold" for={id}>
        {local.label}
      </label>
      <select class={twMerge('rounded px-2 py-1 shadow', local.class)} id={id} {...rest}>
        <For each={local.items}>
          {item => {
            return (
              <option value={item.value} selected={local.value === item.value}>
                {item.text}
              </option>
            )
          }}
        </For>
      </select>
    </div>
  )
}
