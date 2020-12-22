import { useState } from 'react'
import { SetState } from 'types/types'

type ClearErr<K extends string> = (
  key: K
) => (e: React.ChangeEvent<unknown>) => void
type Errs<K extends string> = Record<K, { isErr: boolean; msg: string }>
type UseModalForm<K extends string> = {
  errs: Errs<K>
  setErrs: SetState<Errs<K>>
  errMsgs: string[]
  clearErr: ClearErr<K>
  isLoading: boolean
  setIsLoading: SetState<boolean>
}
export function useModalForm<K extends string>(errKeys: K[]): UseModalForm<K> {
  const defaultErrs = {} as Errs<K>
  errKeys.forEach((key) => {
    defaultErrs[key] = {
      isErr: false,
      msg: '',
    }
  })
  const [errs, setErrs] = useState(defaultErrs)
  const [isLoading, setIsLoading] = useState(false)

  const errMsgs: string[] = []
  errKeys.forEach((key) => {
    const msg: string = errs[key].msg
    msg && errMsgs.push(msg)
  })

  const clearErr: ClearErr<K> = (key: K) => (e: React.ChangeEvent<unknown>) => {
    if (errs[key].isErr) {
      setErrs((prevErrs) => ({
        ...prevErrs,
        [key]: { isErr: false, msg: '' },
      }))
    }
  }

  return { errs, setErrs, errMsgs, clearErr, isLoading, setIsLoading }
}
