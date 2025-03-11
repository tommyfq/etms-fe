import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
// import {CaseCategoryListWrapper} from './case-category-list/CaseCategoryList'
import { PartListWrapper } from './parts-list/PartsList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Parts',
    path: '/apps/parts/list',
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
              <PageTitle breadcrumbs={usersBreadcrumbs}>Part list</PageTitle>
              <PartListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/parts/list' />} />
    </Routes>
  )
}

export default UsersPage
