import {ListViewProvider, useListView} from './core/ListViewProvider'
// import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {HolidayListHeader} from './components/header/HolidayListHeader'
import {HolidayTable} from './table/HolidayTable'
import {HolidayModal} from './holiday-modal/HolidayModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

const HolidaysList = () => {
  const {itemIdForUpdate} = useListView()

  return (
    <>
      <KTCard>
        <HolidayListHeader />
        <HolidayTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <HolidayModal />}
    </>
  )
}

const HolidayListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <HolidaysList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {HolidayListWrapper}