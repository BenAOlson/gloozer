/*
 * 1: Workaround for a), any style passed overriding color prop, and
 *    b) not wanting to pass a style prop unless necessary
 */
import { EuiIcon, EuiIconProps } from '@elastic/eui'
import * as classIcons from 'assets/icons/class-icons'
import playerClasses from 'data/classes'
import { PartyContext } from 'features/party'
import { useContext } from 'react'
import { GiStonedSkull } from 'react-icons/gi'

export type ClassIconProps = {
  type: string
} & Omit<EuiIconProps, 'type'>
const ClassIcon = ({ type, ...props }: ClassIconProps) => {
  const party = useContext(PartyContext)
  const classIndex = playerClasses.findIndex(
    (playerClass) => playerClass.name === type
  )
  const playerClass = playerClasses?.[classIndex]
  const isUnlocked = Object.keys(party.unlockedClasses).includes(type)
  const isDefault = playerClass?.defaultUnlocked
  const color =
    isUnlocked || isDefault ? playerClasses[classIndex].color : props.color

  //TODO: can this typing be better?
  const euiType =
    type === 'empty'
      ? 'empty'
      : (classIcons as any)?.[type?.replace(' ', '')] ?? GiStonedSkull

  return (
    <EuiIcon
      type={euiType}
      color={color}
      {...props}
      style={props.style ? { ...props.style, color } : undefined} /* 1 */
    />
  )
}

export default ClassIcon
