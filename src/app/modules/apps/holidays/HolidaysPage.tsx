import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {HolidayListWrapper} from './holidays-list/HolidayList'

const holidaysBreadcrumbs: Array<PageLink> = [
  {
    title: 'Holidays',
    path: '/apps/holidays/list',
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

const HolidaysPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={holidaysBreadcrumbs}>Holidays list</PageTitle>
              <HolidayListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/holidays/list' />} />
    </Routes>
  )
}

export default HolidaysPage