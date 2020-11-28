import React from 'react'
import {
  EuiBadge,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
} from '@elastic/eui'

type DemonstrativeStuffProps = {
  //
}
const DemonstrativeStuff = ({}: DemonstrativeStuffProps) => {
  return (
    <EuiPageBody>
      <EuiPageContent horizontalPosition="center" verticalPosition="center">
        <EuiPageContentHeader>Buttons</EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton onClick={() => {}}>Primary</EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton fill onClick={() => {}}>
                Filled
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton size="s" onClick={() => {}}>
                Small
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton size="s" fill onClick={() => {}}>
                Small and filled
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton color="secondary" onClick={() => {}}>
                Secondary
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="secondary" fill onClick={() => {}}>
                Filled
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="secondary" size="s" onClick={() => {}}>
                Small
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="secondary" size="s" fill onClick={() => {}}>
                Small and filled
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton color="warning" onClick={() => {}}>
                Warning
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="warning" fill onClick={() => {}}>
                Filled
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="warning" size="s" onClick={() => {}}>
                Small
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="warning" size="s" fill onClick={() => {}}>
                Small and filled
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton color="danger" onClick={() => {}}>
                Danger
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="danger" fill onClick={() => {}}>
                Filled
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="danger" size="s" onClick={() => {}}>
                Small
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="danger" size="s" fill onClick={() => {}}>
                Small and filled
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton color="text" onClick={() => {}}>
                Text
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="text" fill onClick={() => {}}>
                Filled
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="text" size="s" onClick={() => {}}>
                Small
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="text" size="s" fill onClick={() => {}}>
                Small and filled
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton isDisabled onClick={() => {}}>
                Disabled
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton isDisabled fill onClick={() => {}}>
                Filled
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton isDisabled size="s" onClick={() => {}}>
                Small
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton isDisabled size="s" fill onClick={() => {}}>
                Small and filled
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiBadge color="accent">accent</EuiBadge>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge color="accent">accent</EuiBadge>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiBadge color="accent">accent</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  )
}

export default DemonstrativeStuff
