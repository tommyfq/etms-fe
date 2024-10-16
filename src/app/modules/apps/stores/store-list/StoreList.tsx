import {ListViewProvider, useListView} from './core/ListViewProvider.tsx'
// import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider.tsx'
import {QueryResponseProvider} from './core/QueryResponseProvider.tsx'
import {StoreListHeader} from './components/header/StoreListHeader.tsx'
import {StoreTable} from './table/StoreTable'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'
import { StoreModal } from './store-modal/StoreModal'

const StoreList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <StoreListHeader />
        <StoreTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <StoreModal />}
    </>
  )
}

const StoreListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <StoreList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {StoreListWrapper}
