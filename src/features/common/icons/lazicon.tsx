import { EuiIcon, EuiIconProps } from '@elastic/eui'
import React, { Suspense } from 'react'
import { ModuleName, ModuleReference } from 'typescript'

type IconSrcNames = 'GI' | 'GLOOM_ICONS'
type IconSrces = Record<IconSrcNames, string>

//TODO: Reeeeeeeeally unsure this is a good idea...
const iconSrces: IconSrces = {
  GLOOM_ICONS: 'assets/icons/class-icons',
  GI: 'react-icons/gi',
}
type PartyIconProps = {
  iconName: string
  iconSrc: IconSrcNames
} & Omit<EuiIconProps, 'type'>
const PartyIcon = ({ iconName, iconSrc, ...props }: PartyIconProps) => {
  const Icon = React.lazy(() =>
    import('assets/icons/class-icons').then((module) => {
      // import(iconSrces[iconSrc]).then((module) => {
      // import(iconSrc).then((module) => {
      if (Object.keys(module).includes(iconName)) {
        //@ts-ignore
        return { default: module[iconName] }
      }
      // return { default: module.GiBroadsword }
      return { default: 'questionInCircle' }
    })
  )

  return (
    <Suspense fallback={<EuiIcon type="questionInCircle" />}>
      <EuiIcon type={Icon} {...props} />
    </Suspense>
  )
}

export default PartyIcon
