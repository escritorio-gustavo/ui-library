import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'solid-icons/fi'
import { Button } from '../Button'
import { Input } from '../Input'
import { createEffect, createSignal } from 'solid-js'
import formatInt from '../../formatters/intFormatter'
import { twMerge } from 'tailwind-merge'

type PaginationControlProps = {
  numberOfPages: number
  page?: number
  class?: string
  onPageChange: (page: number) => void
}

export function PaginationControls(props: PaginationControlProps) {
  const [page, setPage] = createSignal(props.page ?? 0)

  createEffect(() => {
    props.onPageChange(page())
  })

  createEffect(() => {
    if (props.page !== undefined) {
      setPage(props.page)
    }
  })

  return (
    <div
      class={twMerge(`${props.numberOfPages > 1 ? 'flex' : 'hidden'} items-center justify-center em:gap-2`, props.class)}
    >
      <Button variant={'flat'} disabled={page() === 0} onClick={() => setPage(0)}>
        <FiChevronsLeft />
      </Button>

      <Button variant={'flat'} disabled={page() === 0} onClick={() => setPage(p => p - 1)}>
        <FiChevronLeft />
      </Button>

      <div class="flex items-center gap-2">
        Página
        <Input
          inputMode="numeric"
          class="p-1 text-end [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          name=""
          placeholder=""
          min={1}
          value={page() + 1}
          max={props.numberOfPages}
          onChange={e => {
            const value = Math.floor(e.target.valueAsNumber)

            e.target.value = value.toString()

            if (Number.isNaN(value) || value < 1) {
              e.target.value = '1'
              setPage(0)
              return
            }

            if (value >= props.numberOfPages) {
              e.target.value = props.numberOfPages.toString()
              setPage(props.numberOfPages - 1)
              return
            }

            setPage(e.target.valueAsNumber - 1)
          }}
        />
        / {formatInt(Math.max(props.numberOfPages, 1))}
      </div>

      <Button
        variant={'flat'}
        disabled={props.numberOfPages === 0 || page() === props.numberOfPages - 1}
        onClick={() => setPage(p => p + 1)}
      >
        <FiChevronRight />
      </Button>

      <Button
        variant={'flat'}
        disabled={props.numberOfPages === 0 || page() === props.numberOfPages - 1}
        onClick={() => setPage(props.numberOfPages - 1)}
      >
        <FiChevronsRight />
      </Button>
    </div>
  )
}
