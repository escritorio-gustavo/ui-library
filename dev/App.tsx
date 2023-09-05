import type { Component } from 'solid-js'
import logo from './logo.svg'
import styles from './App.module.css'
import { type ColumnDef, Table } from '../src'

const App: Component = () => {
  const data = [{ foo: 'bar', bar: 'baz', baz: 'biz' }]

  const columns: ColumnDef<(typeof data)[number]>[] = [
    {
      type: 'group',
      header: 'Fo',
      columns: [
        {
          type: 'column',
          header: 'Foo',
          accessor(value) {
            return value.bar
          },
        },
      ],
    },
    {
      type: 'group',
      header: 'BAR',
      columns: [
        {
          type: 'column',
          header: 'Bar',
          accessor(value) {
            return value.bar
          },
        },
        {
          type: 'column',
          header: 'Baz',
          accessor(value) {
            return value.baz
          },
        },
      ],
    },
  ]

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Table columns={columns} data={data} />
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  )
}

export default App
