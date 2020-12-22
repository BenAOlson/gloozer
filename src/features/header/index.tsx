import React, { useContext } from 'react'
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
} from '@elastic/eui'
import HeaderUserMenu from './header-user-menu'
import HeaderPartiesMenu from './header-parties-menu'
import { GiBrutalHelm } from 'react-icons/gi'
import { UserContext } from 'features/firebase/user-context'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const user = useContext(UserContext)
  const history = useHistory()

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <EuiHeader>
      <EuiHeaderSection grow={false}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo
            iconType={GiBrutalHelm}
            href="#"
            onClick={handleLogoClick}
            aria-label="Go to home page"
          />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>

      {/* {renderBreadcrumbs()} */}

      {user && (
        <EuiHeaderSection side="right">
          {/* <EuiHeaderSectionItem>search</EuiHeaderSectionItem> */}

          <EuiHeaderSectionItem>
            <HeaderUserMenu />
          </EuiHeaderSectionItem>

          <EuiHeaderSectionItem border="right">
            <HeaderPartiesMenu />
          </EuiHeaderSectionItem>
          {/* <EuiHeaderSectionItem>
          <HeaderAppMenu />
        </EuiHeaderSectionItem> */}
        </EuiHeaderSection>
      )}
    </EuiHeader>
  )
}

export default Header
