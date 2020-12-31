import { Toast } from '@elastic/eui/src/components/toast/global_toast_list'
import React, { createContext, useState } from 'react'
import { EuiGlobalToastList, htmlIdGenerator } from '@elastic/eui'
import {
  GiBrutalHelm,
  GiDeathSkull,
  GiFlyingFlag,
  GiGlassCelebration,
} from 'react-icons/gi'

type ToastColor = Toast['color']
type AddToastToastParam = Omit<Toast, 'id'>
type AddToast = (toast: AddToastToastParam) => void
export const GlobalToastContext = createContext<AddToast>({} as AddToast)

type GloablToastProps = {
  children: React.ReactNode
}
const GlobalToastProvider = ({ children }: GloablToastProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast: AddToast = (toast: AddToastToastParam) => {
    const iconType = toast.iconType ?? getIconType(toast.color)
    const idToast = { ...toast, id: htmlIdGenerator()() }
    setToasts((prevToasts) => prevToasts.concat({ ...idToast, iconType }))
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

export default GlobalToastProvider

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
