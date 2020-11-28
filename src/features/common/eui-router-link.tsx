import React from 'react'
import { EuiLink } from '@elastic/eui'
import { useHistory } from 'react-router'

//Borrowed with light modifications from:
//https://github.com/elastic/eui/blob/master/wiki/react-router.md#react-router-5x

type Event = React.MouseEvent<HTMLAnchorElement, MouseEvent>

const isModifiedEvent = (event: Event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const isLeftClickEvent = (event: Event) => event.button === 0

const isTargetBlank = (event: Event) => {
  const target = event.currentTarget.getAttribute('target')
  return target && target !== '_self'
}

const EuiRouterLink = ({
  to,
  ...rest
}: {
  //TODO: figure this type out completely
  to: string
  [key: string]: unknown
}) => {
  // This is the key!
  const history = useHistory()

  function onClick(event: Event) {
    if (event.defaultPrevented) {
      return
    }

    // Let the browser handle links that open new tabs/windows
    if (
      isModifiedEvent(event) ||
      !isLeftClickEvent(event) ||
      isTargetBlank(event)
    ) {
      return
    }

    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault()

    // Push the route to the history.
    history.push(to)
  }

  // Generate the correct link href (with basename accounted for)
  const href = history.createHref({ pathname: to })

  const props = { ...rest, href, onClick }
  return <EuiLink {...props} />
}

export default EuiRouterLink
