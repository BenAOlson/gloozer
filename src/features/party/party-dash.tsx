import React from 'react'
import { useParams } from 'react-router-dom'

type PartyDashProps = {
  //
}
const PartyDash = ({}: PartyDashProps) => {
  const { partyId } = useParams<{ partyId: string }>()

  return <div>{partyId}</div>
}

export default PartyDash
