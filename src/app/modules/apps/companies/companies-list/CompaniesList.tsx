import {ListViewProvider, useListView} from './core/ListViewProvider'
//import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {CompaniesListHeader} from './components/header/CompaniesListHeader'
import {CompaniesTable} from './table/CompaniesTable'
import {CompanyEditModal} from './company-edit-modal/CompanyEditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

const CompaniesList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <CompaniesListHeader />
        <CompaniesTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CompanyEditModal />}
    </>
  )
}

const CompaniesListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <CompaniesList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CompaniesListWrapper}
