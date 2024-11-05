import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
//import {getListDC} from '../../core/_request'
// import Select, { StylesConfig, ActionMeta, SingleValue }  from 'react-select'

//type Option = { value: number; label: string };

/*
const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#f8f9fa',
      border: state.isFocused ? '0px solid #DBDFE9' : '0px solid #DBDFE9',
      boxShadow: 'none',
      fontFamily: 'Inter, Helvetica, sans-serif',
      fontSize: '14px',
      fontWeight: '600',
      color:'#99a1b7',
    }),
    menu: (provided) => ({
      ...provided,
      position: 'absolute',
      zIndex: 9999,
      borderRadius: '4px',
      border: '1px solid #ced4da',
      marginTop: '0',
      fontFamily: 'Inter, Helvetica, sans-serif',
      fontSize: '13px',
      fontWeight: '400',
      //color:'#99a1b7',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: 'fixed', // Make the dropdown menu fixed
      top: `${provided.top}px`, // Use calculated position from react-select
      left: `${provided.left}px`, // Use calculated position from react-select
      width: provided.width,  // Ensure the width matches the control
      //color:'#99a1b7',
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: 'Inter, Helvetica, sans-serif',
      fontSize: '13px',
      fontWeight: '400',
      color:'#99a1b7',
    }),
    indicatorSeparator: () => ({
      display: 'none'  // Remove the vertical line before the dropdown arrow
    })
  };
*/

const StoreListFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  //const [dcSelected, setDCSelected] = useState<Option[]>()
  //const [dcOptions, setDCOptions] = useState<Option[]>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()

  useEffect(() => {
    /*
    const fetchDC = async () => {
        try {
            const dcs = await getListDC()
            const formattedOptions = [
                { value: 0, label: "" }, // Add the null value and empty label option first
                ...dcs.data?.map((dc:any) => ({ 
                    value: dc.dc_id || 0,
                    label: dc.dc_name || "",
                })) || []
            ];

            console.log(formattedOptions)
            //setDCOptions(formattedOptions)

        } catch (error) {
            console.error('Error fetching agents:', error)
        }
    }

    fetchDC()
    */

    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  /*
  const filterData = () => {
    const dc = dcSelected?.map(selected=>(selected.value))

    updateState({
      filter: {dc, last_login: lastLogin},
      ...initialQueryState,
    })
  }

  
  const handleChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    setDCSelected(selectedOption); // Set the selected option directly
  };
  */

  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='filter' className='fs-2' />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-gray-900 fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>DC Name</label>
            {/* <Select 
                styles={customStyles} 
                name="dc_id" 
                options={dcOptions}
                value={dcSelected}
                onChange={handleChange}
                isMulti
                closeMenuOnSelect={false}
            /> */}

            {/* <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='role'
              data-hide-search='true'
              onChange={(e) => setDC(e.target.value)}
              value={dc}
            >
                {dcOptions?.map((option)=>(
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select> */}
          </div>
          {/* end::Input group */}
          <div className='mb-10'>
            <label className='form-label fw-bold'>Status:</label>

            <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
                <input
                className='form-check-input'
                type='checkbox'
                value=''
                name='is_active'
                defaultChecked={true}
                />
                <label className='form-check-label'>Active</label>
            </div>
          </div>
          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Last login:</label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='two-step'
              data-hide-search='true'
              onChange={(e) => setLastLogin(e.target.value)}
              value={lastLogin}
            >
              <option value=''></option>
              <option value='Yesterday'>Yesterday</option>
              <option value='20 mins ago'>20 mins ago</option>
              <option value='5 hours ago'>5 hours ago</option>
              <option value='2 days ago'>2 days ago</option>
            </select>
          </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              //udahonClick={filterData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {StoreListFilter}
