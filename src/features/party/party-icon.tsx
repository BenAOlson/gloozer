import { EuiIcon } from '@elastic/eui'
import React, { Suspense } from 'react'

type PartyIconProps = {
  iconName: string
}
const PartyIcon = ({ iconName }: PartyIconProps) => {
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
      <EuiIcon type={Icon} />
    </Suspense>
  )
}

export default PartyIcon
