import { EuiIcon, EuiIconProps } from '@elastic/eui'
import * as classIcons from 'assets/icons/class-icons'
import playerClasses from 'data/classes'
import { PartyContext } from 'features/party'
import { useContext } from 'react'
import { GiStonedSkull } from 'react-icons/gi'

type ClassIconProps = {
  gameclassName: string
} & Omit<EuiIconProps, 'type'>
const ClassIcon = ({ gameclassName, ...props }: ClassIconProps) => {
  const party = useContext(PartyContext)
  const classIndex = playerClasses.findIndex(
    (playerClass) => playerClass.name === gameclassName
  )
  const playerClass = playerClasses?.[classIndex]
  const isUnlocked = Object.keys(party.unlockedClasses).includes(gameclassName)
  const isDefault = playerClass?.defaultUnlocked

  return (
    <EuiIcon
      //TODO: can this type be better?
      type={
        (classIcons as any)?.[gameclassName.replace(' ', '')] ?? GiStonedSkull
      }
      color={
        isUnlocked || isDefault ? playerClasses[classIndex].color : props.color
      }
      {...props}
    />
  )
}

export default ClassIcon
