import { JSX, createUniqueId, splitProps, useContext } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { RadioContext } from '../RadioGroup'

type RadioButtonProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'name' | 'onChange'
> & {
  label: string
  value: string
  onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>
}

export function RadioButton(props: RadioButtonProps) {
  const id = createUniqueId()
  const [local, rest] = splitProps(props, ['label', 'class', 'checked', 'onChange'])
  const { name, value, setValue } = useContext(RadioContext)

  return (
    <div class="flex em:gap-2">
      <input
        id={id}
        name={name}
        type="radio"
        onChange={e => {
          setValue(e.currentTarget.value)
          local.onChange?.(e)
        }}
        checked={local.checked || value() === props.value}
        class={twMerge('shadow', local.class)}
        {...rest}
      />
      <label for={id}>{local.label}</label>
    </div>
  )
}
