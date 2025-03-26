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
import { TicketAssetLogForm } from './ticket-modal/TicketAssetLogForm'
// import {CardsWidgetTicket} from './components/CardsWidgetTicket.tsx'
// import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'


const TicketList = () => {
  const {itemIdForUpdate, setItemIdForUpdate, assetId } = useListView()
  const [searchParams] = useSearchParams()

  const ticketId = searchParams.get('id')
  let parsedTicketId: number

  if (ticketId) {
    parsedTicketId = isNaN(Number(ticketId)) ? 0 : Number(ticketId)
    if (itemIdForUpdate !== parsedTicketId) {
      setItemIdForUpdate(parsedTicketId)
    }
  }

  return (
    <>
      <KTCard>
        <TicketListHeader />
        <TicketTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <TicketModal />}
      {assetId !== undefined && <TicketAssetLogForm /> }
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
