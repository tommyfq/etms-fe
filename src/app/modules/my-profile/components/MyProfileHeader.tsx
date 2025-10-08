
import { FC } from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../_metronic/layout/components/content'

const MyProfileHeader: FC = () => {
  const location = useLocation()

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className='mb-5'>
          <div className='card-body pb-0'>

            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/settings' && 'active')
                    }
                    to='/apps/account/settings'
                  >
                    Settings
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/change-password' && 'active')
                    }
                    to='/apps/account/change-password'
                  >
                    Change Password
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export {MyProfileHeader}
