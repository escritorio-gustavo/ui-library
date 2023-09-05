import { splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import formatInt from '../../formatters/intFormatter'
import { twMerge } from 'tailwind-merge'

type ProgressBarProps = JSX.ProgressHTMLAttributes<HTMLProgressElement> & {
  value: number
  max: number
  displayValue?: number
  displayMax?: number
}

export function ProgressBar(props: ProgressBarProps) {
  const [local, rest] = splitProps(props, ['value', 'max', 'displayValue', 'displayMax', 'class'])

  return (
    <div class="w-full">
      <output>
        {formatInt(local.displayValue ?? local.value)} / {formatInt(local.displayMax ?? local.max)}
      </output>
      <progress
        class={twMerge(
          'h-2 w-full overflow-hidden rounded shadow-inner [&::-webkit-progress-value]:bg-sky-500',
          local.class,
        )}
        value={local.value}
        max={local.max}
        {...rest}
      >
        {local.value} / {local.max}
      </progress>
    </div>
  )
}
