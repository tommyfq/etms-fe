//import {ListViewProvider, useListView} from './core/ListViewProvider.tsx'
import {ListViewProvider} from './core/ListViewProvider.tsx'
import {QueryRequestProvider} from './core/QueryRequestProvider.tsx'
import {QueryResponseProvider} from './core/QueryResponseProvder.tsx'
import {ReportingListHeader} from './components/header/ReportingListHeader.tsx'
import {ReportingTable} from './table/ReportingTable.tsx'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'
// import { StoreModal } from './store-modal/StoreModal'

const ReportingList = () => {
  // const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ReportingListHeader />
        <ReportingTable />
      </KTCard>
      {/* {itemIdForUpdate !== undefined && <StoreModal />} */}
    </>
  )
}

const ReportingListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <ReportingList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ReportingListWrapper}
