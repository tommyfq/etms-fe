import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ItemListWrapper} from './items-list/ItemList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Items',
    path: '/apps/items/list',
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

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Items list</PageTitle>
              <ItemListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/items/list' />} />
    </Routes>
  )
}

export default UsersPage
