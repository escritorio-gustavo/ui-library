import { createStore } from 'solid-js/store'
import { createContext, createSignal, createUniqueId, onMount, splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type TabsProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'ref'> & {
  onTabChange?: (e: { oldTab: number; newTab: number }) => void
  direction?: 'vertical' | 'horizontal'
}

type TabContext = [
  { id: string; tab: number; direction: 'vertical' | 'horizontal' },
  {
    increment(): void
    decrement(): void
    setSelectedTab(tab: number): void
    getIndex(element: HTMLElement | undefined): number
  },
]

const flexDirection = cva('flex em:gap-4', {
  variants: {
    direction: {
      vertical: 'flex-row',
      horizontal: 'flex-col',
    },
  },
})

export const TabContext = createContext<TabContext>([
  { tab: 0, id: '', direction: 'horizontal' },
  {
    increment() {},
    decrement() {},
    setSelectedTab(_) {},
    getIndex: () => 0,
  },
])

export function Tabs(props: TabsProps) {
  const id = createUniqueId()

  const [local, rest] = splitProps(props, ['class', 'direction'])
  const [state, setState] = createStore({ tab: 0, id, direction: local.direction ?? 'horizontal' })
  const [tabCount, setTabCount] = createSignal(1)

  let ref: HTMLElement | undefined

  // Necessary to ensure the ref works properly
  onMount(() => setTabCount(ref?.querySelectorAll('ul > li').length ?? 1))

  const store = [
    state,
    {
      increment() {
        props.onTabChange?.({ newTab: (state.tab + 1) % tabCount(), oldTab: state.tab })
        setState('tab', i => (i + 1) % tabCount())
      },
      decrement() {
        props.onTabChange?.({ newTab: tabCount() + state.tab - 1, oldTab: state.tab })
        setState('tab', i => (tabCount() + i - 1) % tabCount())
      },
      setSelectedTab(i) {
        props.onTabChange?.({ newTab: i, oldTab: state.tab })
        setState('tab', i)
      },
      getIndex(element) {
        if (!element?.parentElement) return -1

        return Array.prototype.indexOf.call(element.parentElement.children, element)
      },
    },
  ] satisfies TabContext

  return (
    <TabContext.Provider value={store}>
      <section
        class={twMerge(flexDirection({ direction: local.direction ?? 'horizontal' }), local.class)}
        ref={ref}
        {...rest}
      />
    </TabContext.Provider>
  )
}
