import {FC, useEffect} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

type Props = {
  id: ID
}

const HolidayActionCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

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

export {HolidayActionCell}