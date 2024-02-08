import { For } from 'solid-js'
import { ColumnDef } from './types'

type TableHeading = {
  header: string
  span: number
}

type ColumnWithSpan<T> = ColumnDef<T> & { span: number }

type THeadProps<T> = {
  columns: ColumnDef<T>[]
}

export function THead<T>(props: THeadProps<T>) {
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

function treeToArray<T>(columns: ColumnDef<T>[]): TableHeading[][] {
  const result: TableHeading[][] = []
  const root: ColumnWithSpan<T> = {
    type: 'group',
    header: '',
    columns,
    span: 0,
  }

  addLeafCountToNodes(root)
  traverse(root, 0, result)

  result.shift()

  return result
}

function addLeafCountToNodes<T>(node: ColumnDef<T> & { span?: number }): number {
  if (node.type === 'column') {
    node.span = 1
    return 1
  }

  const count = node.columns.reduce((acc, cur) => acc + addLeafCountToNodes(cur), 0)

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
