import {ListViewProvider, useListView} from './core/ListViewProvider'
// import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {CaseCategoryListHeader} from './components/header/CaseCategoryListHeader'
import {CaseCategoryTable} from './table/CaseCategoryTable'
import {CaseCategoryModal} from './case-category-modal/CaseCategoryModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

const CaseCategoryList = () => {
  const {itemIdForUpdate} = useListView()

  return (
    <>
      <KTCard>
        <CaseCategoryListHeader />
        <CaseCategoryTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CaseCategoryModal />}
    </>
  )
}

const CaseCategoryListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <CaseCategoryList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CaseCategoryListWrapper}
