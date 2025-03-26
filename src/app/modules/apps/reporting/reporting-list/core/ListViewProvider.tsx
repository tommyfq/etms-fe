/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext, useMemo} from 'react'
import {
  ID,
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  initialListView,
  ListViewContextProps,
  groupingOnSelectAll,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import {useQueryResponse, useQueryResponseData} from './QueryResponseProvder'

const ListViewContext = createContext<ListViewContextProps>(initialListView)

const ListViewProvider: FC<WithChildren> = ({children}) => {
  const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
  const [assetId, setAssetId] = useState<ID>(initialListView.assetId)
  const [ticketNo, setTicketNo] = useState<string>(''); // Initialize ticketNo appropriately
  const { isLoading } = useQueryResponse(); // Assume this hook fetches loading state
  const data = useQueryResponseData(); // Assume this hook fetches data
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

  return (
    <ListViewContext.Provider
    value={{
      selected,
      itemIdForUpdate,
      setItemIdForUpdate,
      assetId,
      setAssetId,
      disabled,
      isAllSelected,
      ticketNo,
      setTicketNo,
      onSelect: (id: ID) => {
        groupingOnSelect(id, selected, setSelected);
      },
      onSelectAll: () => {
        groupingOnSelectAll(isAllSelected, setSelected, data);
      },
      clearSelected: () => {
        setSelected([]);
      },
    }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useListView = () => useContext(ListViewContext)

export {ListViewProvider, useListView}
