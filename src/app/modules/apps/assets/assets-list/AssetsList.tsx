import {useEffect} from 'react'
import {ListViewProvider, useListView} from './core/ListViewProvider'
//import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {AssetListHeader} from './components/header/AssetListHeader'
import {AssetTable} from './table/AssetTable'
import {AssetModal} from './asset-modal/AssetModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

const AssetsList = () => {
  useEffect( () => {
    console.log("MASUK")
  })

  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <AssetListHeader />
        <AssetTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <AssetModal />}
    </>
  )
}

const AssetListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <AssetsList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {AssetListWrapper}
