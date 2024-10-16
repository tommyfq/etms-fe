
import {FC, useEffect} from 'react'
//import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
//import {ID, KTIcon, QUERIES} from '../../../../../../../_metronic/helpers'
import {ID, KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {useQueryResponse} from '../../core/QueryResponseProvider'
// import {deleteUser} from '../../core/_requests'

type Props = {
  id: ID
}

const AssetActionCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
//   const {query} = useQueryResponse()
//   const queryClient = useQueryClient()

  useEffect(() => {
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
          Edit
        </button>
      </div>
    </>
  )
}

export {AssetActionCell}
