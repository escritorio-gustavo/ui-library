import { JSX, createContext, createEffect, createSignal, splitProps } from 'solid-js'
import { twMerge } from 'tailwind-merge'

type RadioGroupProps = JSX.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  name: string
  label: string
  value?: string
}

export const RadioContext = createContext({
  name: '',
  value: () => '' as string | undefined,
  setValue(_v: string) {},
})

export function RadioGroup(props: RadioGroupProps) {
  const [local, rest] = splitProps(props, ['name', 'class', 'label', 'children', 'value'])
  const [value, setValue] = createSignal(local.value)

  createEffect(() => setValue(local.value))

  return (
    <RadioContext.Provider
      value={{
        name: local.name,
        value,
        setValue,
      }}
    >
      <fieldset class="grid gap-2" {...rest}>
        <legend class="font-bold">{local.label}</legend>
        <div class={twMerge('flex gap-4', local.class)}>{local.children}</div>
      </fieldset>
    </RadioContext.Provider>
  )
}
