import { For, JSX, splitProps } from 'solid-js'
import { THead } from './THead'
import type { Column, ColumnDef } from './types'

type TableProps<T> = JSX.HTMLAttributes<HTMLTableElement> & {
  data: T[]
  columns: ColumnDef<T>[]
}

export function flattenColumns<T>(columns: ColumnDef<T>[]): Column<T>[] {
  const mapper = (column: ColumnDef<T>): Column<T>[] => {
    if ('columns' in column) {
      return column.columns.flatMap(mapper)
    } else {
      return [column]
    }
  }

  return columns.flatMap(mapper)
}

export function createColumnHelper<T>() {
  return {
    group(header: string, columns: Column<T>[]): ColumnDef<T> {
      return { type: 'group', header, columns }
    },
    column<F extends (value: T) => any>(
      accessor: F,
      header: string,
      render?: (data: ReturnType<F>) => JSX.Element,
    ): ColumnDef<T> {
      return { type: 'column', accessor, header, render }
    },
  }
}

export function Table<T>(props: TableProps<T>) {
  const [local, rest] = splitProps(props, ['columns', 'data'])
  const flatColumns = () => flattenColumns(local.columns)

  return (
    <table class="border-collapse" {...rest}>
      <THead columns={local.columns} />
      <tbody class="divide-y-2 border-2">
        <For each={local.data}>
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
  )
}
