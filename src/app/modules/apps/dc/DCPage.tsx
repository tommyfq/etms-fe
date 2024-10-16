import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {DCListWrapper} from './dc-list/DCList'

const dcBreadcrumbs: Array<PageLink> = [
  {
    title: 'DC',
    path: '/apps/dc/list',
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

const DCPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={dcBreadcrumbs}>DC list</PageTitle>
              <DCListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/dc/list' />} />
    </Routes>
  )
}

export default DCPage
