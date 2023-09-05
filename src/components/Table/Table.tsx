import { For, JSX, splitProps } from 'solid-js'

export type ColumnDef<T> = Column<T> | { type: 'group'; header: string; columns: ColumnDef<T>[] }

type Column<T> = {
  type: 'column'
  accessor: (value: T) => unknown
  header: string
  render?: (value: any) => JSX.Element
}

type TableProps<T> = JSX.HTMLAttributes<HTMLTableElement> & {
  data: T[]
  columns: ColumnDef<T>[]
}

type ColumnWithSpan<T> = ColumnDef<T> & { span: number }

type TableHeading = {
  header: string
  span: number
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

function countLeaves<T>(node: ColumnDef<T> & { span?: number }): number {
  if (node.type === 'column') {
    node.span = 1
    return 1
  }

  const count = node.columns.reduce((acc, cur) => acc + countLeaves(cur), 0)

  node.span = count
  return count
}

function traverse<T>(node: ColumnWithSpan<T>, depth: number, result: TableHeading[][]) {
  result[depth] ??= []
  result[depth]?.push({ header: node.header, span: node.span })

  if (node.type === 'column') {
    return
  }

  for (const child of node.columns) {
    traverse(child as ColumnDef<T> & { span: number }, depth + 1, result)
  }
}

export function treeToArray<T>(columns: ColumnDef<T>[]): TableHeading[][] {
  const root: ColumnDef<T> & { span: number } = { type: 'group', header: '', columns, span: 0 }
  const result: TableHeading[][] = []

  countLeaves(root)
  traverse(root, 0, result)

  result.shift()

  return result
}

export function THead<T>(props: { columns: ColumnDef<T>[] }) {
  const rows = treeToArray(props.columns)

  return (
    <thead class="divide-y-2 border-2">
      <For each={rows}>
        {row => (
          <tr class="divide-x-2">
            <For each={row}>
              {column => (
                <th class="em:px-3 em:py-1" colSpan={column.span}>
                  {column.header}
                </th>
              )}
            </For>
          </tr>
        )}
      </For>
    </thead>
  )
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
