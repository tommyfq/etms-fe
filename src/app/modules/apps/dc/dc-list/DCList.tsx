import {ListViewProvider, useListView} from './core/ListViewProvider.tsx'
// import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider.tsx'
import {QueryResponseProvider} from './core/QueryResponseProvider.tsx'
import {DCListHeader} from './components/header/DCListHeader.tsx'
import {DCTable} from './table/DCTable.tsx'
// import {CompanyEditModal} from './company-edit-modal/CompanyEditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'
import { DCEditModal } from './dc-edit-modal/DCEditModal.tsx'

const DCList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <DCListHeader />
        <DCTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <DCEditModal />}
    </>
  )
}

const DCListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <DCList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {DCListWrapper}
