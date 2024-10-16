import {useEffect} from 'react'
// import {ListViewProvider} from './core/ListViewProvider'
import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UserListHeader} from './components/header/UserListHeader'
import {UserTable} from './table/UserTable'
import {UserModal} from './user-modal/UserModal'
import {KTCard} from '../../../../../_metronic/helpers'
import { ToolbarWrapper } from '../../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../../_metronic/layout/components/content'

const UsersList = () => {

    useEffect( () => {
        console.log("MASUK")
      })
    
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <UserListHeader />
        <UserTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserModal />}
    </>
  )
}

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ToolbarWrapper />
        <Content>
          <UsersList />
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UsersListWrapper}
