import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ReportingListWrapper} from './reporting-list/ReportingList'

const reportBreadcrumbs: Array<PageLink> = [
  {
    title: 'Report',
    path: '/apps/report/list',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ReportPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/list'
          element={
            <>
              <PageTitle breadcrumbs={reportBreadcrumbs}>Reporting</PageTitle>
              <ReportingListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/report' />} />
    </Routes>
  )
}

export default ReportPage
