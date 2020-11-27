import React, { useLayoutEffect } from 'react'

const RemoveWarning = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      const elem = document.getElementsByClassName('firebase-emulator-warning')
      elem[0]?.remove()
    }, 200)
  }, [])

  return <></>
}

export default RemoveWarning
