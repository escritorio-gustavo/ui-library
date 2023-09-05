import { createSignal, onMount, splitProps, useContext } from 'solid-js'
import { Button } from '../../Button'
import { twMerge } from 'tailwind-merge'
import { TabContext } from '../Tabs'
import { cva } from 'class-variance-authority'

const active = cva(
  ['[&:not([aria-selected=true])]:brightness-50', 'border-neutral-50', 'rounded-none'],
  {
    variants: {
      direction: {
        vertical: 'aria-selected:border-l-4 w-full text-left',
        horizontal: 'aria-selected:border-b-4',
      },
    },
  },
)

type TabProps = Omit<
  Parameters<typeof Button>[0],
  | 'role'
  | 'variant'
  | 'className'
  | 'aria-selected'
  | 'tabindex'
  | 'tabIndex'
  | 'onclick'
  | 'onClick'
  | 'aria-controls'
>

export function Tab(props: TabProps) {
  let ref: HTMLLIElement | undefined
  const [state, { getIndex, setSelectedTab }] = useContext(TabContext)
  const [local, rest] = splitProps(props, ['class'])
  const [index, setIndex] = createSignal(-1)

  // Necessary to ensure the ref works properly
  onMount(() => setIndex(getIndex(ref)))

  const isSelected = () => state.tab === index()

  return (
    <li ref={ref} role="presentation">
      <Button
        aria-controls={`${state.id}-${index()}`}
        aria-selected={isSelected()}
        class={twMerge(active({ direction: state.direction }), local.class)}
        onClick={e => {
          e.preventDefault()
          setSelectedTab(index())
        }}
        tabIndex={isSelected() ? 0 : -1}
        role="tab"
        variant="flat"
        {...rest}
      />
    </li>
  )
}
