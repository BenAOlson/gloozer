import React from 'react'
import { EuiButton } from '@elastic/eui'
import { useState } from 'react'
import CreatePartyModal from './create-party-modal'

//! Not currently in use

type CreatePartyProps = {
  //
}
const CreateParty = ({}: CreatePartyProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <EuiButton onClick={openModal}>Create party</EuiButton>
      {isModalOpen && <CreatePartyModal setIsOpen={setIsModalOpen} />}
    </>
  )
}

export default CreateParty
