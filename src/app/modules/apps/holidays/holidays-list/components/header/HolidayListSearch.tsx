/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect, useState} from 'react'
import {initialQueryState, KTIcon } from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'

const HolidayListSearch = () => {
  const {updateState} = useQueryRequest()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = () => {
    updateState({search: searchTerm, ...initialQueryState})
  }

  const resetData = () => {
    setSearchTerm("")
  }

  useEffect(() => {
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
          placeholder='Search holidays'
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

export {HolidayListSearch}