import {ListViewProvider } from './core/ListViewProvider'
//import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {AssetListHeader} from './components/header/AssetListHeader'
import {AssetTable} from './table/AssetTable'
import {KTCard} from '../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../_metronic/layout/components/content'

const AssetList = () => {
  return (
    <>
      <KTCard>
        <AssetListHeader />
        <AssetTable />
      </KTCard>
    </>
  )
}

const AssetListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <AssetList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {AssetListWrapper}
