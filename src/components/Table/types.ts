import { JSX } from 'solid-js/jsx-runtime'

type ColumnGroup<T> = {
  type: 'group'
  header: string
  columns: ColumnDef<T>[]
}

export type Column<T> = {
  type: 'column'
  header: string
  accessor: (value: T) => unknown
  render?: (value: any) => JSX.Element
}

export type ColumnDef<T> = Column<T> | ColumnGroup<T>
