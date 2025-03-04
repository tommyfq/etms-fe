import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { useAuth } from '../modules/auth'

const PrivateRoutes = () => {
  const { currentUser } = useAuth()
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/users/UsersPage'))
  const AssetPage = lazy(() => import('../modules/apps/assets/AssetPage'))
  const CompanyPage = lazy(() => import('../modules/apps/companies/CompanyPage'))
  const DCPage = lazy(() => import('../modules/apps/dc/DCPage'))
  const StorePage = lazy(() => import('../modules/apps/stores/StorePage'))
  const TicketPage = lazy(() => import('../modules/apps/tickets/TicketPage'))
  const RolePage = lazy(() => import('../modules/apps/roles/RolePage'))
  const ItemsPage = lazy(() => import('../modules/apps/items/ItemsPage'))
  const ReportPage = lazy(() => import('../modules/apps/reporting/ReportingPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />

        {currentUser?.role_name === 'admin' ? (
            <Route path='apps/users/*' element={<SuspensedView><UsersPage /></SuspensedView>} />
        ) : (
          <Route path='apps/users/*' element={<Navigate to='/dashboard' />} />
        )}

        {currentUser?.role_name === 'admin' ? (
            <Route path='apps/companies/*' element={<SuspensedView><CompanyPage /></SuspensedView>} />
          
        ) : (
          <Route path='apps/companies/*' element={<Navigate to='/dashboard' />} />
        )}

        {currentUser?.role_name == 'admin' ? (
          <Route path='apps/items/*' element={<SuspensedView><ItemsPage /></SuspensedView>}/>
        ) : (
          <Route path='apps/items/*' element={<Navigate to='/dashboard' />} />
        )}

        {/* <Route
          path='apps/users/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        /> */}
        <Route
          path='apps/assets/*'
          element={
            <SuspensedView>
              <AssetPage />
            </SuspensedView>
          }
        />
        
        <Route
          path='apps/dc/*'
          element={
            <SuspensedView>
              <DCPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/store/*'
          element={
            <SuspensedView>
              <StorePage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/tickets/*'
          element={
            <SuspensedView>
              <TicketPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/roles/*'
          element={
            <SuspensedView>
              <RolePage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/report/*'
          element={
            <SuspensedView>
              <ReportPage />
            </SuspensedView>
          }
        />
        
        {/* Page Not Found */}
        {/* <Route path='*' element={<Navigate to='/error/404' />} /> */}
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
