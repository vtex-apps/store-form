import { FunctionComponent, ReactElement } from 'react'

declare global {
  interface SFC<P = {}> extends FunctionComponent<P> {
    getSchema?(props: P): object
    schema?: object
  }
}
