import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Ticket',
    path: '/apps/tickets/list',
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

const TicketsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='role'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Users list</PageTitle>
              
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/user-management/users' />} />
    </Routes>
  )
}

export default TicketsPage
