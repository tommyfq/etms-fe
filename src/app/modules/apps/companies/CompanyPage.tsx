import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CompaniesListWrapper} from './companies-list/CompaniesList'

const companiesBreadcrumbs: Array<PageLink> = [
  {
    title: 'Companies',
    path: '/apps/companies/list',
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

const CompanyPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={companiesBreadcrumbs}>Company list</PageTitle>
              <CompaniesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/companies/list' />} />
    </Routes>
  )
}

export default CompanyPage
