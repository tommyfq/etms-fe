
import {FC, useEffect} from 'react'
//import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
//import {ID, KTIcon, QUERIES} from '../../../../../../../_metronic/helpers'
import {ID} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {useQueryResponse} from '../../core/QueryResponseProvider'
// import {deleteUser} from '../../core/_requests'

type Props = {
    data?: string,
    id?: ID
}

const TicketNoColumnCell: FC<Props> = ({data,id}) => {
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
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
        <a className='text-gray-900 fw-bold text-hover-primary fs-6' href="#" onClick={
          openEditModal
          }>
            {data}
        </a>
        </div>
    </div>
    </>
  )
}

export {TicketNoColumnCell}
