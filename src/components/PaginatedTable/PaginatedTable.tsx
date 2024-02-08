import { JSX } from 'solid-js/jsx-runtime'
import { ColumnDef } from '../Table'
import { For, Show, createEffect, createSignal, splitProps } from 'solid-js'
import { THead } from '../Table/THead'
import { Button } from '../Button'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'solid-icons/fi'
import { Input } from '../Input'
import formatInt from '../../formatters/intFormatter'
import { flattenColumns } from '../Table/Table'

type TableProps<T> = JSX.HTMLAttributes<HTMLTableElement> & {
  data: T[]
  columns: ColumnDef<T>[]
  pageSize: number
}

export function PaginatedTable<T>(props: TableProps<T>) {
  const [page, setPage] = createSignal(0)
  const [local, rest] = splitProps(props, ['columns', 'data', 'pageSize'])
  const flatColumns = () => flattenColumns(local.columns)

  const numberOfPages = () => Math.ceil(local.data.length / local.pageSize)

  createEffect(() => {
    if (page() >= numberOfPages()) {
      setPage(Math.max(numberOfPages() - 1, 0))
    }
  })

  return (
    <div class="grid gap-2 justify-center">
      <Show when={numberOfPages() > 1}>
        <div class="flex items-center justify-center em:gap-2">
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
              max={numberOfPages()}
              onChange={e => {
                const value = Math.floor(e.target.valueAsNumber)

                e.target.value = value.toString()

                if (Number.isNaN(value) || value < 1) {
                  e.target.value = '1'
                  setPage(0)
                  return
                }

                if (value >= numberOfPages()) {
                  e.target.value = numberOfPages().toString()
                  setPage(numberOfPages() - 1)
                  return
                }

                setPage(e.target.valueAsNumber - 1)
              }}
            />
            / {formatInt(Math.max(numberOfPages(), 1))}
          </div>

          <Button
            variant={'flat'}
            disabled={numberOfPages() === 0 || page() === numberOfPages() - 1}
            onClick={() => setPage(p => p + 1)}
          >
            <FiChevronRight />
          </Button>

          <Button
            variant={'flat'}
            disabled={numberOfPages() === 0 || page() === numberOfPages() - 1}
            onClick={() => setPage(numberOfPages() - 1)}
          >
            <FiChevronsRight />
          </Button>
        </div>
      </Show>

      <table class="border-collapse" {...rest}>
        <THead columns={local.columns} />
        <tbody class="divide-y-2 border-2">
          <For each={local.data.slice(local.pageSize * page(), local.pageSize * (page() + 1))}>
            {row => (
              <tr>
                <For each={flatColumns()}>
                  {column => (
                    <td class="em:px-3">
                      {column.render
                        ? column.render(column.accessor(row))
                        : column.accessor(row)?.toString()}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}
