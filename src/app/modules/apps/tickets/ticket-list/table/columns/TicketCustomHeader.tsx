import clsx from 'clsx'
import {FC, PropsWithChildren, useMemo} from 'react'
import {HeaderProps} from 'react-table'
import {initialQueryState} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {TicketList} from '../../core/_models'

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<TicketList>>
}
const unsortColumn = ["Category","Asset","Store","Actions"];

const TicketCustomHeader: FC<Props> = ({className, title, tableProps}) => {
  const id = tableProps.column.id
  const {state, updateState} = useQueryRequest()

  const isSelectedForSorting = useMemo(() => {
    return state.sort && state.sort === id
  }, [state, id])
  const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({sort: id, order: 'asc', ...initialQueryState})
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        updateState({sort: id, order: 'desc', ...initialQueryState})
        return
      }

      // disable sort
      updateState({sort: undefined, order: undefined, ...initialQueryState})
    }
  }

  const isSortable = !unsortColumn.includes(title || '')

  return (
        <th
          {...tableProps.column.getHeaderProps()}
          className={clsx(
            className,
            isSelectedForSorting && order !== undefined && `table-sort-${order}`
          )}
          style={{ cursor: isSortable ? 'pointer' : 'default' }}
          onClick={isSortable ? sortColumn : undefined}
        >
          {title}
        </th>
  )
}

export {TicketCustomHeader}
