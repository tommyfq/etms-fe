import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {StoreListWrapper} from './store-list/StoreList'

const storeBreadcrumbs: Array<PageLink> = [
  {
    title: 'Store',
    path: '/apps/store/list',
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

const StorePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={storeBreadcrumbs}>Store list</PageTitle>
              <StoreListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/store/list' />} />
    </Routes>
  )
}

export default StorePage
