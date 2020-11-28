import { useState } from 'react'

type ModalFormErrs = {
  [key: string]: {
    isErr: boolean
    msg: string
  }
}
export const useModalForm = (errKeys: string[]) => {
  const defaultErrs: ModalFormErrs = {}
  errKeys.forEach((key) => {
    defaultErrs[key] = {
      isErr: false,
      msg: '',
    }
  })
  const [errs, setErrs] = useState<ModalFormErrs>(defaultErrs)
  const [isLoading, setIsLoading] = useState(false)

  const errMsgs: string[] = []
  errKeys.forEach((key) => {
    const msg: string = errs[key].msg
    msg && errMsgs.push(msg)
  })

  const clearErr = (key: string) => (e: React.ChangeEvent<unknown>) => {
    if (errs[key].isErr) {
      setErrs((prevErrs) => ({
        ...prevErrs,
        [key]: { isErr: false, msg: '' },
      }))
    }
  }

  return { errs, setErrs, errMsgs, clearErr, isLoading, setIsLoading }
}
