import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {MyProfileDetails} from './components/MyProfileDetails'
import {ChangePassword} from './components/ChangePassword'
import { MyProfileHeader } from './components/MyProfileHeader'
import { Content } from '../../../_metronic/layout/components/content'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/apps/account/settings',
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

const MyProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <MyProfileHeader />
          <Outlet />
        </>
      }
    >
      <Route
        path='/settings'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Account Settings</PageTitle>
            <Content>
              <MyProfileDetails />
            </Content>
          </>
        }
      />
      <Route
        path='/change-password'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Change Password</PageTitle>
            <Content>
              <ChangePassword />
            </Content>
          </>
        }
      />
      <Route index element={<Navigate to='/apps/account/settings' />} />
    </Route>
  </Routes>
)

export default MyProfilePage
