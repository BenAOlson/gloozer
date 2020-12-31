import { EuiCheckableCard, EuiSpacer, EuiText } from '@elastic/eui'
import playerClasses, { GameSet, PlayerClass } from 'data/classes'
import React from 'react'
import styled from '@emotion/styled'
import { PartyData, SetState } from 'types/types'
import { removePrimativefromArr } from 'utils'
import ClassIcon from 'features/common/icons/class-icon'

type ClassUnlockProps = {
  party: PartyData
  selectedClasses: string[]
  setSelectedClasses: SetState<string[]>
}
const ClassUnlockCards = ({
  party,
  selectedClasses,
  setSelectedClasses,
}: ClassUnlockProps) => {
  const handleClick = (className: string) => () => {
    toggleSelected(className)
    return
  }

  const toggleSelected = (className: string) => {
    setSelectedClasses((prevSelectedClasses) => {
      const wasChecked = prevSelectedClasses.includes(className)
      if (!wasChecked) return [...prevSelectedClasses, className]

      const updatedClasses = removePrimativefromArr(
        className,
        prevSelectedClasses
      )

      return updatedClasses
    })
  }

  const gamesetOrganizedClasses = Object.entries(
    playerClasses.reduce<Partial<Record<GameSet, PlayerClass[]>>>(
      (obj, playerClass) => {
        const { gameset } = playerClass

        return { ...obj, [gameset]: [...(obj?.[gameset] ?? []), playerClass] }
      },
      {}
    )
  )

  const groupedClasses = gamesetOrganizedClasses.map(
    ([gameset, gamesetClasses], i) => {
      const classes = gamesetClasses?.map((playerClass) => {
        const { name, defaultUnlocked } = playerClass
        const isChecked = selectedClasses.includes(playerClass.name)
        const isUnlocked = Object.keys(party.unlockedClasses).includes(name)
        const isRevealed = isUnlocked || defaultUnlocked

        return (
          <EuiCheckableCard
            id={name}
            key={name}
            label={
              <>
                <EuiText>
                  <h4 style={{ fontSize: '1.2em' }}>
                    {isRevealed ? name : '???'}
                  </h4>
                </EuiText>
                <EuiSpacer size="xs" />
                <ClassIcon gameclassName={name} size="xxl" />
              </>
            }
            checkableType="checkbox"
            value={name}
            checked={isChecked}
            onChange={handleClick(name)}
            // onChange={(e) => {
            //   e.preventDefault()
            // }}
          />
        )
      })

      return (
        <React.Fragment key={gameset}>
          <EuiText>
            <h3>{gameset}</h3>
          </EuiText>
          <EuiSpacer size="s" />
          <Grid>{classes}</Grid>
          {i < gamesetOrganizedClasses.length - 1 && <EuiSpacer />}
        </React.Fragment>
      )
    }
  )

  return <>{groupedClasses}</>
}

export default ClassUnlockCards

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  max-width: 100%;
  width: 85vw;
  grid-gap: 5px;
`
