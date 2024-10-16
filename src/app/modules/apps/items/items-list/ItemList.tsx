import {ListViewProvider, useListView} from './core/ListViewProvider'
// import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ItemListHeader} from './components/header/ItemListHeader'
import {ItemTable} from './table/ItemTable'
import {ItemModal} from './item-modal/ItemModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

const ItemsList = () => {
  const {itemIdForUpdate} = useListView()

  return (
    <>
      <KTCard>
        <ItemListHeader />
        <ItemTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <ItemModal />}
    </>
  )
}

const ItemListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <ItemsList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ItemListWrapper}
