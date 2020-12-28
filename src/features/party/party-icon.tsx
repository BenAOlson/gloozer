import { EuiIcon, EuiIconProps } from '@elastic/eui'
import React, { Suspense } from 'react'

type PartyIconProps = {
  iconName: string
} & Omit<EuiIconProps, 'type'>
const PartyIcon = ({ iconName, size }: PartyIconProps) => {
  const Icon = React.lazy(() =>
    import('react-icons/gi').then((module) => {
      if (Object.keys(module).includes(iconName)) {
        // @ts-ignore
        return { default: module[iconName] }
      }
      return { default: module.GiBroadsword }
    })
  )

  return (
    <Suspense fallback={<EuiIcon type="questionInCircle" />}>
      <EuiIcon type={Icon} size={size} />
    </Suspense>
  )
}

export default PartyIcon
