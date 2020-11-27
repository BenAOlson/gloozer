import React from 'react'
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
} from '@elastic/eui'
import HeaderUserMenu from './header-user-menu'
import HeaderPartiesMenu from './header-parties-menu'
import { GiBrutalHelm } from 'react-icons/gi'

type HeaderProps = {
  //
}
const Header = ({}: HeaderProps) => {
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
    </EuiHeader>
  )
}

export default Header
