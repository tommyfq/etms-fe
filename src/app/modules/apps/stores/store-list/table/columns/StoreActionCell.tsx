
import {FC, useEffect, useState } from 'react'
//import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
//import {ID, KTIcon, QUERIES} from '../../../../../../../_metronic/helpers'
import {ID} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {useQueryResponse} from '../../core/QueryResponseProvider'
// import {deleteUser} from '../../core/_requests'
import { useAuth, AuthModelUser } from '../../../../../../modules/auth'

type Props = {
  id: ID
}

const StoreActionCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {currentUser} = useAuth()
  const [user, setUser] = useState<AuthModelUser>()
//   const {query} = useQueryResponse()
//   const queryClient = useQueryClient()

  useEffect(() => {
    setUser(currentUser)
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

//   const deleteItem = useMutation(() => deleteUser(id), {
//     // 💡 response of the mutation is passed to onSuccess
//     onSuccess: () => {
//       // ✅ update detail view directly
//       queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
//     },
//   })

  return (
    <>
      <div className='menu-item px-3'>
        <button className='btn btn-sm btn-primary' onClick={openEditModal}>
        { user?.role_name == "admin" ? 'Edit' : 'View' }
        </button>
      </div>
    </>
  )
}

export {StoreActionCell}
