/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect, useState} from 'react'
import {initialQueryState, KTIcon } from '../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'

const AssetListSearch = () => {
  const {updateState} = useQueryRequest()
  const [searchTerm, setSearchTerm] = useState<string>('')
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
//   const debouncedSearchTerm = useDebounce(searchTerm, 150)
  // Effect for API call
//   useEffect(
//     () => {
//       if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
//         updateState({search: debouncedSearchTerm, ...initialQueryState})
//       }
//     },
//     [debouncedSearchTerm] // Only call effect if debounced search term changes
//     // More details about useDebounce: https://usehooks.com/useDebounce/
//   )

  const handleSearch = () => {
    updateState({search: searchTerm, ...initialQueryState})
  }

  const resetData = () => {
    setSearchTerm("")
    //updateState({search: undefined, ...initialQueryState})
  }

  useEffect(() => {
    // Whenever searchTerm changes to an empty string, it ensures the input is cleared.
    if (searchTerm === "") {
      updateState({ search: undefined, ...initialQueryState });
    }
  }, [searchTerm]);

  return (
    <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Store Code / Name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          <KTIcon iconName="magnifier" iconType="solid" className="fs-2" />
        </button>

        <button className="btn btn-secondary ms-3" onClick={resetData}>Reset</button>
      </div>
      {/* end::Search */}
    </div>
  )
}

export {AssetListSearch}
