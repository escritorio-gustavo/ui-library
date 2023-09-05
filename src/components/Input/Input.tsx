import { JSX, Show, createUniqueId, splitProps } from 'solid-js'
import { twMerge } from 'tailwind-merge'

type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  name: string
} & (
    | { label: string; placeholder: string }
    | { label: string; placeholder?: undefined }
    | { label?: undefined; placeholder: string }
  )

export function Input(props: InputProps) {
  const id = createUniqueId()
  const [local, rest] = splitProps(props, ['label', 'class'])

  return (
    <div class="grid em:gap-2">
      <Show when={local.label}>
        <label class="font-bold" for={id}>
          {local.label}
        </label>
      </Show>
      <input id={id} class={twMerge('rounded px-2 py-1 shadow', local.class)} {...rest} />
    </div>
  )
}
