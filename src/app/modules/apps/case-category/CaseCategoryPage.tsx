import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CaseCategoryListWrapper} from './case-category-list/CaseCategoryList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Case Category',
    path: '/apps/case-category/list',
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
              <PageTitle breadcrumbs={usersBreadcrumbs}>Case Category list</PageTitle>
              <CaseCategoryListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/case-category/list' />} />
    </Routes>
  )
}

export default UsersPage
