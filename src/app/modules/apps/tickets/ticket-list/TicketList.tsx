import {ListViewProvider, useListView} from './core/ListViewProvider.tsx'
// import {ListViewProvider} from './core/ListViewProvider.tsx'
import {QueryRequestProvider} from './core/QueryRequestProvider.tsx'
import {QueryResponseProvider} from './core/QueryResponseProvider.tsx'
import {TicketListHeader} from './components/header/TicketListHeader.tsx'
import {TicketTable} from './table/TicketTable.tsx'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'
import { TicketModal } from './ticket-modal/TicketModal'
// import {CardsWidgetTicket} from './components/CardsWidgetTicket.tsx'
// import { useEffect } from 'react'


const TicketList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <TicketListHeader />
        <TicketTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <TicketModal />}
    </>
  )
}

const TicketListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <div className='g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
              {/* <CardsWidgetTicket className='h-md-50 mb-5 mb-xl-10' /> */}
            </div>
          </div>
          <TicketList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {TicketListWrapper}
