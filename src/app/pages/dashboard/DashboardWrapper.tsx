import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'

import { WidgetTicketByStatus } from './components/WidgetTicketByStatus'
// import { TablesWidget10 } from './components/TablesWidget10'
import { CardsWidget17 } from './components/CardsWidget17'
import ChartLineTransaction from './components/ChartLineTransaction'


import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'
import { Content } from '../../../_metronic/layout/components/content'

const DashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10 mb-5'>
      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5'>
        <WidgetTicketByStatus className='card-xl-stretch mb-5 mb-xl-8' color='primary' />
      </div>
      {/* end::Col */}

      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-9 mb-md-5'>
        <ChartLineTransaction />
        {/* <ChartsWidget3 className='card-xl-stretch mb-xl-8' /> */}
        {/* <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' /> */}
        {/* <ListsWidget26 className='h-lg-50' /> */}
      </div>
      {/* end::Col */}

      {/* begin::Col */}
      {/* <div className='col-xxl-6'>
        <EngageWidget10 className='h-md-100' />
      </div> */}
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gx-5 gx-xl-10'>
      {/* begin::Col */}
      <div className='col-xxl-6 mb-5 mb-xl-10'>
        <CardsWidget17 className='mb-5 mb-xl-10' />
        {/* <app-new-charts-widget8 cssclassName="h-xl-100" chartHeight="275px" [chartHeightNumber]="275"></app-new-charts-widget8> */}
      </div>
      {/* end::Col */}

      {/* begin::Col */}
      <div className='col-xxl-6 mb-5 mb-xl-10'>
        {/* <app-cards-widget18 cssclassName="h-xl-100" image="./assetsmedia/stock/600x600/img-65.jpg"></app-cards-widget18> */}
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    {/* <div className='row gy-5 gx-xl-8'>
      <div className='col-xl-12'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div> */}
    {/* end::Row */}
    </Content>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
