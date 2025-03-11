import {ListViewProvider, useListView} from './core/ListViewProvider'
// import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {PartListHeader} from './components/header/PartListHeader'
import {PartTable} from './table/PartTable'
import {PartModal} from './part-modal/PartModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

const PartList = () => {
  const {itemIdForUpdate} = useListView()

  return (
    <>
      <KTCard>
        <PartListHeader />
        <PartTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <PartModal />}
    </>
  )
}

const PartListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <PartList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {PartListWrapper}
