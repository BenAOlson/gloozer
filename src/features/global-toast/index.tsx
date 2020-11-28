import { Toast } from '@elastic/eui/src/components/toast/global_toast_list'
import React, { createContext, useState } from 'react'
import { EuiGlobalToastList } from '@elastic/eui'
import {
  GiBrutalHelm,
  GiDeathSkull,
  GiFlyingFlag,
  GiGlassCelebration,
} from 'react-icons/gi'

//TODO: Don't hardcode this
type ToastColor = 'primary' | 'success' | 'warning' | 'danger' | undefined
type AddToast = (toast: Toast) => void
export const GlobalToastContext = createContext<AddToast>({} as AddToast)

type GloablToastProps = {
  children: React.ReactNode
}
const GlobalToast = ({ children }: GloablToastProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast: AddToast = (toast: Toast) => {
    const iconType = toast.iconType ?? getIconType(toast.color)
    setToasts((prevToasts) => prevToasts.concat({ ...toast, iconType }))
  }

  const removeToast = (removedToast: Toast) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== removedToast.id)
    )
  }

  return (
    <GlobalToastContext.Provider value={addToast}>
      {children}
      <EuiGlobalToastList
        toasts={toasts}
        toastLifeTimeMs={6000}
        dismissToast={(removedToast) => {
          removeToast(removedToast)
        }}
      />
    </GlobalToastContext.Provider>
  )
}

export default GlobalToast

const getIconType = (color: ToastColor) => {
  switch (color) {
    case 'primary':
      return GiBrutalHelm
    case 'success':
      return GiGlassCelebration
    case 'warning':
      return GiFlyingFlag
    case 'danger':
      return GiDeathSkull
    default:
      return GiBrutalHelm
  }
}
