import { splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { twMerge } from 'tailwind-merge'

type FormProps = JSX.FormHTMLAttributes<HTMLFormElement>

export function Form(props: FormProps) {
  const [local, rest] = splitProps(props, ['enctype', 'class'])

  return (
    <form
      class={twMerge('grid gap-4', local.class)}
      enctype={local.enctype ?? 'multipart/form-data'}
      {...rest}
    />
  )
}
