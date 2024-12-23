import {Column} from 'react-table'
import {AssetStoreCell} from './AssetStoreCell'
import {AssetNumberCell} from './AssetNumberCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {AssetCustomHeader} from './AssetCustomHeader'
import {AssetPercentageCell} from './AssetPercentageCell'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {AssetStore} from '../../core/_models'

const companiesColumns: ReadonlyArray<Column<AssetStore>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <AssetCustomHeader tableProps={props} title='Store' className='min-w-125px' />,
    id: 'store_code',
    Cell: ({...props}) => <AssetStoreCell asset_store={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Active Assets' className='min-w-125px' />
    ),
    id: 'active_asset_count',
    Cell: ({...props}) => <AssetNumberCell data={props.data[props.row.index].active_asset_count} />,
  },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Repaired Assets' className='min-w-125px' />
    ),
    id: 'repaired_asset_count',
    Cell: ({...props}) => <AssetNumberCell data={props.data[props.row.index].repaired_asset_count} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Percentage' className='min-w-125px' />
    ),
    id: 'percentage',
    Cell: ({...props}) => <AssetPercentageCell data={props.data[props.row.index].percentage } />,
  },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
]

export {companiesColumns}
