import { PartyData } from 'types/types'
import React, { useState } from 'react'
import {
  EuiPageBody,
  EuiPageContent,
  // EuiPageContentHeader,
  // EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiButton,
  EuiSpacer,
  EuiFlexItem,
  EuiCard,
  EuiIcon,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
} from '@elastic/eui'
import CreateScenarioModal from 'features/scenario/create-scenario/create-scenario-modal'
// import Brute from 'assets/icons/Brute'

import CreateCharacterModal from 'features/character/create-character-modal'
import DummyCharacterCard from 'features/character/dummy-character-card'
// import { GiBrute } from 'react-icons/gi'
// import PartyIcon from '../party-icon'

type PartyDashProps = {
  party: PartyData
}
const PartyDash = ({ party }: PartyDashProps) => {
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false)
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false)

  return (
    <>
      <EuiPageBody>
        {/* <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>
                {party.displayName}
              </h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader> */}
        <EuiPageContent hasShadow={false}>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h1>{party.displayName}</h1>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiButton
                  color="secondary"
                  fill
                  onClick={() => setIsScenarioModalOpen(true)}
                >
                  New scenario
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton
                  color="secondary"
                  onClick={() => setIsCharacterModalOpen(true)}
                >
                  New Character
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <DummyCharacterCard party={party} />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
      {isScenarioModalOpen && (
        <CreateScenarioModal setIsOpen={setIsScenarioModalOpen} />
      )}
      {isCharacterModalOpen && (
        <CreateCharacterModal
          setIsOpen={setIsCharacterModalOpen}
          party={party}
        />
      )}
    </>
  )
}

export default PartyDash
