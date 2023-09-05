import { cva } from 'class-variance-authority'
import { JSX, splitProps } from 'solid-js'
import { twMerge } from 'tailwind-merge'

const classes = cva(
  [
    'select-none',
    'font-bold',
    'transition-colors',
    'disabled:cursor-not-allowed',
    'disabled:brightness-90',
    'disabled:saturate-50',
    'em:rounded',
    'em:px-4',
    'em:py-2',
  ],
  {
    variants: {
      variant: {
        primary: [
          // Dark theme
          'enabled:dark:hover:bg-sky-400',
          'dark:bg-sky-500',
          'enabled:dark:active:bg-sky-600',

          // Light theme
          'enabled:hover:bg-sky-500',
          'bg-sky-600',
          'enabled:active:bg-sky-700',

          // Both themes
          'text-neutral-50',
        ],
        danger: [
          // Dark theme
          'enabled:dark:hover:bg-red-300',
          'dark:bg-red-400',
          'enabled:dark:active:bg-red-500',

          // Light theme
          'enabled:hover:bg-red-400',
          'bg-red-500',
          'enabled:active:bg-red-600',

          // Both themes
          'text-neutral-50',
        ],
        success: [
          // Both themes
          'enabled:hover:bg-green-500',
          'bg-green-600',
          'enabled:active:bg-green-700',

          'text-neutral-50',
        ],
        flat: ['bg-transparent disabled:brightness-50 enabled:hover:bg-neutral-50/10 em:px-2'],
      },
      size: {
        small: ['text-small shadow-sm'],
        medium: ['text-base shadow'],
        large: ['text-lg shadow-lg'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
)

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & Parameters<typeof classes>[0]

export function Button(props: ButtonProps) {
  const [classNames, _] = splitProps(props, ['variant', 'size'])
  const [local, rest] = splitProps(_, ['children', 'type', 'class'])

  return (
    <button
      type={local.type ?? 'button'}
      class={twMerge(classes(classNames), local.class)}
      {...rest}
    >
      {local.children}
    </button>
  )
}
