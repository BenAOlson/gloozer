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

type HeaderProps = {
  //
}
const Header = ({}: HeaderProps) => {
  const user = useContext(UserContext)

  return (
    <EuiHeader>
      <EuiHeaderSection grow={false}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo
            iconType={GiBrutalHelm}
            href="#"
            onClick={(e) => e.preventDefault()}
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
