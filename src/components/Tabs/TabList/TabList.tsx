import { splitProps, useContext } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { TabContext } from '../Tabs'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

type TabListProps = Omit<JSX.HTMLAttributes<HTMLUListElement>, 'role'>

const flexDirection = cva('flex em:gap-2', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
  },
})

export function TabList(props: TabListProps) {
  let ref: HTMLUListElement | undefined

  const [state, { increment, decrement }] = useContext(TabContext)
  const [local, rest] = splitProps(props, ['class'])

  return (
    <ul
      class={twMerge(flexDirection({ direction: state.direction }), local.class)}
      role="tablist"
      ref={ref}
      onKeyDown={e => {
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowUp': {
            e.preventDefault()
            decrement()

            // Casting the string to 'button' makes TS realize I'm selecting
            // a HTMLButtonElement, which allows me to invoke `.focus()`
            const button = ref?.querySelector(`li:nth-child(${state.tab + 1}) > button` as 'button')
            button?.focus()
            break
          }
          case 'ArrowRight':
          case 'ArrowDown': {
            e.preventDefault()
            increment()

            const button = ref?.querySelector(`li:nth-child(${state.tab + 1}) > button` as 'button')
            button?.focus()
            break
          }
        }
      }}
      {...rest}
    />
  )
}
