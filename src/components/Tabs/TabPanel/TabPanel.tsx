import { createSignal, onMount, useContext } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { TabContext } from '../Tabs'

type TabPanelProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'ref' | 'role' | 'tabindex' | 'tabIndex'
>

export function TabPanel(props: TabPanelProps) {
  let ref: HTMLDivElement | undefined
  const [state, { getIndex }] = useContext(TabContext)
  const [index, setIndex] = createSignal(-1)

  // Necessary to ensure the ref works properly
  onMount(() => setIndex(getIndex(ref)))

  // Minus one because the first tab panel is the second child
  // of its container (TabList is the first)
  const isSelected = () => state.tab === index() - 1

  return (
    <div
      id={`${state.id}-${index() - 1}`}
      role="tabpanel"
      hidden={!isSelected()}
      tabIndex={isSelected() ? 0 : -1}
      ref={ref}
      {...props}
    />
  )
}
